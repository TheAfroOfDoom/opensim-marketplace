USE `opensim`;
DROP procedure IF EXISTS `marketplaceDownloadAsset`;

DELIMITER $$
USE `opensim`$$
CREATE PROCEDURE `marketplaceDownloadAsset`(
	IN	`userID` CHAR(36)
,	IN	`assetID` CHAR(36)
,	OUT	`error` INT
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
					,	-1						-- type
                    ,	1						-- version
                    ,	@parentFolderID			-- folderID
                    ,	`userID`				-- agentID
                    ,	@myInventoryFolderID	-- parentFolderID
                    )
				;
                
			-- Else, folder already exists, so grab the ID.
			ELSE				
				-- Grab user's "Marketplace Downloads" folder ID
				SELECT	`folderID`
				INTO	@parentFolderID
					FROM inventoryfolders i
				WHERE	`folderName` = 'Marketplace Downloads'
					AND	`agentID` = `userID`
				;
			END IF
            ;
    
    
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
                ,	UUID()	-- inventoryID (new UUID)
                ,	`userID`
                ,	@parentFolderID
                ,	0		-- inventoryGroupPermissions
				)
			;
    END IF
    ;
END$$

DELIMITER ;

