-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: opensim2
-- ------------------------------------------------------
-- Server version	8.0.21
USE opensim;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DELIMITER ;;
ALTER TABLE `assetstest` 
ADD COLUMN `public` TINYINT(1) NOT NULL DEFAULT '0',
ADD COLUMN `marketplace_icon` LONGBLOB NULL DEFAULT NULL AFTER `public`;
;;
DELIMITER ;

--
-- Dumping routines for database 'opensim2'
--
/*!50003 DROP PROCEDURE IF EXISTS `marketplaceDeleteFolder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `marketplaceDeleteFolder`(
	IN	`temporaryFolderID` CHAR(36)
,	OUT	`error` INT
)
BEGIN	
    -- TODO(jordan): Loop through all subfolders inside tempFolder
    
	-- Delete all assets in this folder
    DELETE
		FROM `inventoryitems` ii
    WHERE ii.`parentFolderID` = `temporaryFolderID`
    ;
    
    -- Delete tempFolder itself
    DELETE
		FROM `inventoryfolders` i
	WHERE i.`folderID` = `temporaryFolderID`
    ;
    
    SET `error` = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `marketplaceDownloadAsset` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `marketplaceDownloadAsset`(
	IN	`userID` CHAR(36)
,	IN	`assetID` CHAR(36)
,	OUT	`error` INT
,	OUT `inventoryID` CHAR(36)
)
BEGIN
	SET @preExisting =
    (
		SELECT	COUNT(*)
			FROM `inventoryitems` i
		WHERE	`assetID` = i.`assetID`
			AND	`userID` = i.`avatarID`
	)
    ;
    
    SET @allFlags = 2147483647;
    
    -- If there is already a row with the same user and asset, return an error code of 1.
    IF @preExisting >= 1
	THEN	SET `error` = 1; 
    
    -- Otherwise, continue
    ELSE	SET `error` = 0;
	
			-- Grab user information
            SELECT	`firstName` + ' ' + `lastName`
			INTO	@inventoryName
                FROM `useraccounts` u
			WHERE	u.`PrincipalID` = `userID`
            ;
    
			-- Grab asset information
            SELECT	`assetType`
				,	`name`
                ,	`description`
                ,	`assetType`
				,	`CreatorID`
                ,	`create_time`
			INTO	@assetType
				,	@inventoryName
                ,	@inventoryDescription
                ,	@invType
				,	@creatorID
                ,	@creationDate
				FROM `assets` a
			WHERE	a.`id` = `assetID`
            ;
    
			SET @parentFolderID = '00000000-0000-0000-0000-000000000000';
			-- Ensure user's "Marketplace Downloads" folder exists (and create if it does not)
            SELECT	COUNT(*)
            INTO	@marketplaceFolderExists
				FROM inventoryfolders i
			WHERE	`folderName` = 'Marketplace Downloads'
				AND	`agentID` = `userID`
			;
            
            -- If 'Marketplace Downloads' folder does not already exist
            IF @marketplaceFolderExists <> 1
            THEN
				DELETE FROM inventoryfolders
				WHERE	`folderName` = 'Marketplace Downloads'
					AND	`agentID` = `userID`
				;
    
				-- Grab user's "Marketplace Downloads" folder ID
				SELECT	`folderID`
				INTO	@myInventoryFolderID
					FROM inventoryfolders i
				WHERE	`folderName` = 'My Inventory'
					AND	`agentID` = `userID`
				;
                
                SET @parentFolderID = UUID();
                
                INSERT INTO `inventoryfolders`
					VALUES
                    (
						'Marketplace Downloads'	-- folderName
					,	-1						-- type			(-1 = user defined)
                    ,	0						-- version		(initialized)
                    ,	@parentFolderID			-- folderID
                    ,	`userID`				-- agentID
                    ,	@myInventoryFolderID	-- parentFolderID
                    )
				;
                
			-- Else, folder already exists, so grab the ID.
			ELSE				
				-- Grab user's "Marketplace Downloads" folder ID
				SELECT	`folderID`, `version`
				INTO	@parentFolderID, @folderVersion
					FROM inventoryfolders i
				WHERE	`folderName` = 'Marketplace Downloads'
					AND	`agentID` = `userID`
				;
			END IF
            ;
    
			-- Generate new inventory row UUID
            SET `inventoryID` = UUID();
    
			-- Add a new row with the associations
            INSERT INTO `inventoryitems`
				VALUES
                (
                -- http://opensimulator.org/wiki/Inventoryitems
                -- Fields prefixed with a '*' are not yet implemented.
					`assetID`	-- assetID
				,	@assetType	-- assetType
                ,	@inventoryName
                ,	@inventoryDescription
                ,	@allFlags		-- inventoryNextPermissions (http://opensimulator.org/wiki/OpenSimulator:Permissions)
                ,	@allFlags		-- inventoryCurrentPermissions
                ,	@invType
                ,	@creatorID
                ,	@allFlags		-- inventoryBasePermissions
                ,	0		-- inventoryEveryOnePermissions
                ,	0		-- salePrice
                ,	0		-- saleType
                ,	@creationDate
                ,	'00000000-0000-0000-0000-000000000000'		-- *groupID
                ,	0		-- *groupOwned
                ,	0		-- *flags
                ,	`inventoryID`	-- inventoryID (new UUID)
                ,	`userID`
                ,	@parentFolderID
                ,	0		-- inventoryGroupPermissions
				)
			;
            
            -- Increment version number
            SET @folderVersion = @folderVersion + 1;
            
            -- Update `inventoryfolders` table version number to refresh inventory (?!)
            UPDATE	`inventoryfolders`
				SET	version = @folderVersion
			WHERE	`folderID` = @parentFolderID
            ;
    END IF
    ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `marketplaceExportAssets` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `marketplaceExportAssets`(
	IN	`rootFolderID` CHAR(36)
,	IN	`userID` CHAR(36)
,	IN	`folderIDs` LONGTEXT
,	IN	`inventoryIDs` LONGTEXT
,	IN	`keepStructure` BOOL
,	OUT	`error` INT
,	OUT `temporaryFolderID` CHAR(36)
,	OUT `temporaryFolderName` VARCHAR(36)
)
BEGIN

	-- Grab user's "My Inventory" folder ID
	SELECT	`folderID`
	INTO	@myInventoryFolderID
		FROM inventoryfolders i
	WHERE	`folderName` = 'My Inventory'
		AND	`agentID` = `userID`
	;
	
	-- Create new *temp* parent folder to store assets in, store under "My Inventory"
	SET @parentFolderID = UUID();
    SET @temporaryFolderName = 'MARKETPLACE_EXPORT';
	INSERT INTO `inventoryfolders`
		VALUES
		(
			@temporaryFolderName	-- folderName
		,	-1						-- type
		,	0						-- version
		,	@parentFolderID			-- folderID
		,	`userID`				-- agentID
		,	@myInventoryFolderID	-- parentFolderID
		)
	;
	SET `temporaryFolderID` = @parentFolderID;
    SET `temporaryFolderName` = @temporaryFolderName;

	-- TODO(jordan): Implement `keepStructure` later
		
	-- TODO(jordan): Loop through all folder IDs
		/*
	SET @folderIDs = `folderIDs`;
	WHILE	LENGTH(@folderIDs) > 0	DO
		-- `folderIDs` must be a comma-separated string of UUIDs, with an extra ',' at the end
		-- e.g.: '7ffb227e-6676-11eb-bcbb-7a791901c580,2d12e1d5-1178-4c5a-b990-b144af9336d1,'
		SET @currentFolderID	= SUBSTRING_INDEX(@folderIDs, ',',  1);	-- first UUID
		SET @folderIDs			= SUBSTRING_INDEX(@folderIDs, ',', -1);	-- rest of them
        
        IF	`keepStructure` THEN
			SET `error` = 1;
        ELSE
			SET `error` = 0;
			-- NOTE(jordan): This will just add assets to the same level inside the root folder
			-- Add all assets inside this folder
            CALL marketplaceInternalTraverseFolder(@parentFolderID,	@0)
            
            -- Recursively add the assets in each subfolder
        END IF
        ;
	END WHILE
	;
		*/
	
	-- Loop through all asset IDs
	SET @inventoryIDs = `inventoryIDs`;
	WHILE	LENGTH(@inventoryIDs) > 0	DO
		-- `inventoryIDs` must be a comma-separated string of UUIDs, with an extra ',' at the end
		-- e.g.: '7ffb227e-6676-11eb-bcbb-7a791901c580,2d12e1d5-1178-4c5a-b990-b144af9336d1,'
		SET @currentInventoryID	= SUBSTRING_INDEX(@inventoryIDs, ',',  1);	-- first UUID
		SET @inventoryIDs		= SUBSTRING_INDEX(@inventoryIDs, ',', -1);	-- rest of them
		
		-- Grab entire row information
		SELECT	`assetID`
			,	`assetType`
			,	`inventoryName`
			,	`inventoryDescription`
			,	`inventoryNextPermissions`
			,	`inventoryCurrentPermissions`
			,	`invType`
			,	`creatorID`
			,	`inventoryBasePermissions`
			,	`inventoryEveryOnePermissions`
			,	`salePrice`
			,	`saleType`
			,	`creationDate`
			,	`groupID`
			,	`groupOwned`
			,	`flags`
			,	`avatarID`
			,	`parentFolderID`
			,	`inventoryGroupPermissions`
		INTO	@assetID
			,	@assetType
			,	@inventoryName
			,	@inventoryDescription
			,	@inventoryNextPermissions
			,	@inventoryCurrentPermissions
			,	@invType
			,	@creatorID
			,	@inventoryBasePermissions
			,	@inventoryEveryOnePermissions
			,	@salePrice
			,	@saleType
			,	@creationDate
			,	@groupID
			,	@groupOwned
			,	@flags
			,	@avatarID
			,	@parentFolderID
			,	@inventoryGroupPermissions
			FROM `inventoryitems`
		WHERE	`inventoryID` = @currentInventoryID
		;
		
		-- Add inventoryitems row inside the generated temp folder
		INSERT INTO `inventoryitems`
			VALUES
			(
			-- http://opensimulator.org/wiki/Inventoryitems
				@assetID							-- assetID
			,	@assetType							-- assetType
			,	@inventoryName						-- inventoryName
			,	@inventoryDescription				-- inventoryDescription
			,	@inventoryNextPermissions			-- inventoryNextPermissions
			,	@inventoryCurrentPermissions		-- inventoryCurrentPermissions
			,	@invType							-- invType
			,	@creatorID							-- creatorID
			,	@inventoryBasePermissions			-- inventoryBasePermissions
			,	@inventoryEveryOnePermissions		-- inventoryEveryOnePermissions
			,	@salePrice							-- salePrice
			,	@saleType							-- saleType
			,	@creationDate						-- creationDate
			,	@groupID							-- groupID
			,	@groupOwned							-- groupOwned
			,	@flags								-- flags
			,	UUID()								-- inventoryID (new UUID)
			,	@avatarID							-- avatarID
			,	@parentFolderID						-- parentFolderID
			,	@inventoryGroupPermissions			-- inventoryGroupPermissions
			)
		;
	END WHILE
	;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-12 16:28:47
