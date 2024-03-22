-- NEXS-DEV Dump
-- version 1.0.0
-- todo DB
-- -- 生成日時: 2024-03-17 20:44:25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- データベース: todo
--

-- --------------------------------------------------------


CREATE DATABASE `todo`;

USE `todo`;

--
-- テーブルの構造 `user`
--
CREATE TABLE `user` (`uid` VARCHAR(255) NOT NULL COMMENT 'FirebasseのUID' COLLATE UTF8MB4_BIN, `user_name` VARCHAR(255) NOT NULL COMMENT '' COLLATE UTF8MB4_BIN, `user_state` TINYINT NOT NULL DEFAULT '1' COMMENT '', `user_email` VARCHAR(1000) NOT NULL COMMENT '' COLLATE UTF8MB4_BIN, `user_last_login` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '', `user_dateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '') ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `todo_set`
--
CREATE TABLE `todo_set` (`todo_set_id` BIGINT UNSIGNED NOT NULL COMMENT '', `todo_set_name` VARCHAR(255) NOT NULL COMMENT '' COLLATE UTF8MB4_BIN, `toso_set_dateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '') ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `todo`
--
CREATE TABLE `todo` (`todo_id` BIGINT UNSIGNED NOT NULL COMMENT '', `todo_set_id` BIGINT UNSIGNED NOT NULL COMMENT '', `todo_name` VARCHAR(255) NOT NULL COMMENT '' COLLATE UTF8MB4_UNICODE_520_CI, `todo_description` VARCHAR(255) NOT NULL COMMENT '' COLLATE UTF8MB4_UNICODE_520_CI, `todo_importance` TINYINT NULL DEFAULT NULL COMMENT 'null：なし
1:低
2:中
3:高', `todo_limit` DATE NOT NULL COMMENT '', `todo_manager` VARCHAR(255) NULL DEFAULT NULL COMMENT '' COLLATE UTF8MB4_BIN, `todo_dateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '') ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルのインデックス `user`
--
ALTER TABLE `user` 
   ADD PRIMARY KEY (`uid`), 
  ADD KEY user_email_QnGD (`user_email`);

--
-- テーブルのインデックス `todo_set`
--
ALTER TABLE `todo_set` 
   ADD PRIMARY KEY (`todo_set_id`);

--
-- テーブルのインデックス `todo`
--
ALTER TABLE `todo` 
   ADD PRIMARY KEY (`todo_id`);

--
-- テーブルの AUTO_INCREMENT `todo_set`
--
ALTER TABLE `todo_set`    MODIFY `todo_set_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
  ;

--
-- テーブルの AUTO_INCREMENT `todo`
--
ALTER TABLE `todo`    MODIFY `todo_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
  ;

--
-- テーブルの制約 `todo`
--
ALTER TABLE `todo` 
    ADD CONSTRAINT `todo_todo_set_id_fk_jIX` FOREIGN KEY (`todo_set_id`) REFERENCES `todo_set` (`todo_set_id`) ON UPDATE CASCADE ON DELETE CASCADE, 
    ADD CONSTRAINT `todo_todo_manager_fk_NdL` FOREIGN KEY (`todo_manager`) REFERENCES `user` (`uid`) ON UPDATE SET NULL ON DELETE SET NULL;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;