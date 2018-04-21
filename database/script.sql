CREATE DATABASE condor_test;
USE condor_test;


CREATE TABLE user_profile( 
    id_user bigint(8) NOT NULL,
    nm_first varchar(50)  NULL,
    nm_middle varchar(50)  NULL,
    nm_last varchar(50)  NULL,
    PRIMARY KEY(id_user)    
);
                          
CREATE TABLE user_address(
    id_address bigint(8) PRIMARY KEY NOT NULL,
    id_user bigint(8) NOT NULL,
    CONSTRAINT FK_id_user FOREIGN KEY(id_user)
    REFERENCES User_profile(id_user));

                          
CREATE TABLE user_role(
    id_user bigint(8) NOT NULL,
    cd_role_type varchar(50)  NOT NULL,
    id_entity bigint(8)  NOT NULL,
    in_status bigint(8) NOT NULL, 
    PRIMARY KEY(id_user,cd_role_type,id_entity),
    CONSTRAINT FK_user_profile FOREIGN KEY (id_user) REFERENCES User_profile(id_user)
);
