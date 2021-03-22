<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $data = json_decode($postdata);

    // Suppression des utilisateurs ne se trouvant plus dans la liste renvoyee
    $sql_query = "SELECT id, nom, login, password, profil FROM users";
    
    if($result = mysqli_query($con,$sql_query))
    {
        $i = 0;

        while($row = mysqli_fetch_assoc($result))
        {
            $verif = true; // verifie si l'element se trouve toujours dans la liste

            foreach($data as $value)
            {
                if ($row['id'] == $value->id) 
                {
                    break;
                }
                else
                {
                    $verif = false;
                }
            }

            if ($verif == false) 
            {
                // Suppression de l'utilisateur
                $sql_delete = "DELETE FROM `users` WHERE `id` ='{$row['id']}'";
                mysqli_query($con, $sql_delete);
            }

            $i++;
        }
    }

    // Mise a jour des valeurs des users ou ajout de nouvel utilisateur
    foreach($data as $value)
    {
        $id = $value->id;
        $nom = $value->nom;
        $login = $value->login;
        $password = $value->password;
        $profil = $value->profil;

        // Skip des chaines vides
        if (empty($login) || empty($login) || empty($password) || empty($profil)) 
        {
            continue;
        }

        $sql_select_id = "SELECT nom FROM users WHERE `id` ='{$id}'";
        $res = mysqli_query($con, $sql_select_id);

        if ($res)
        {
            // Mise a jour des donnees de l'utilisateur
            $sql_update = "UPDATE `users` SET `id`='$id', `nom` = '$nom', `login`='$login', `password`='$password', `profil`='$profil' WHERE `id` = '{$id}'";
            mysqli_query($con, $sql_update);
        }
        else
        {
            $sql_insert = "INSERT INTO `users`(`id`,`nom`,`login`, `password`, `profil`) VALUES ('{$id}','{$nom}','{$login}', '{$password}', '{$profil}')";
            mysqli_query($con, $sql_insert);
        }
    }
}

?>