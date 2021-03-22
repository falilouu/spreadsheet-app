<?php
    require 'database.php';
    
    $users = [];

    $sql = "SELECT id, nom, login, password, profil FROM users";
    
    if($result = mysqli_query($con,$sql))
    {
        $i = 0;

        while($row = mysqli_fetch_assoc($result))
        {
            $users[$i]['id']    = $row['id'];
            $users[$i]['nom'] = $row['nom'];
            $users[$i]['login'] = $row['login'];
            $users[$i]['password'] = $row['password'];
            $users[$i]['profil'] = $row['profil'];
            $i++;
        }

        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }
?>