USE condor_test;

SELECT COUNT(*) AS 'Non-active Providers'
FROM user_role
WHERE in_status = 0 
AND cd_role_type='PROVIDER';


SELECT rl.cd_role_type as 'User Type', COUNT(rl.id_user) AS 'Total Active', COUNT(uad.id_address) AS 'Active Licensees With Address Info'
FROM user_role rl
LEFT JOIN user_address uad ON uad.id_user = rl.id_user
WHERE in_status=1 
AND rl.cd_role_type='LICENSEE'
OR rl.cd_role_type='LIMITED'
GROUP BY rl.cd_role_type;

SELECT rl.cd_role_type AS 'User Type', COUNT(*) AS 'Total Active',COUNT(pr.nm_middle) AS 'No Middle Name'
FROM user_role rl 
INNER JOIN user_profile pr ON pr.id_user = rl.id_user 
WHERE rl.in_status= 1
GROUP BY rl.cd_role_type;
