/*
Navicat MySQL Data Transfer

Source Server         : what
Source Server Version : 50731
Source Host           : localhost:3306
Source Database       : huiyi

Target Server Type    : MYSQL
Target Server Version : 50731
File Encoding         : 65001

Date: 2021-06-25 15:31:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for meeting
-- ----------------------------
DROP TABLE IF EXISTS `meeting`;
CREATE TABLE `meeting` (
  `meeting_id` int(11) NOT NULL AUTO_INCREMENT,
  `meeting_name` varchar(255) NOT NULL,
  `time_begin` datetime NOT NULL,
  `time_end` datetime NOT NULL,
  `longitude` decimal(9,6) DEFAULT '114.342350',
  `latitude` decimal(9,6) DEFAULT '30.499340',
  `radius` decimal(4,3) DEFAULT '5.000',
  `status` tinyint(4) DEFAULT '0' COMMENT '-1代表被取消，0代表未开始，1代表进行中，2代表已结束',
  `meeting_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`meeting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for relationship
-- ----------------------------
DROP TABLE IF EXISTS `relationship`;
CREATE TABLE `relationship` (
  `meeting_id` int(11) NOT NULL,
  `user_id` bigint(13) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0表示参与者，1代表会议发起者',
  KEY `r_m` (`meeting_id`),
  KEY `r_u` (`user_id`) USING BTREE,
  CONSTRAINT `r_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting` (`meeting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `r_u` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(13) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Procedure structure for UPDATE_STATUS
-- ----------------------------
DROP PROCEDURE IF EXISTS `UPDATE_STATUS`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_STATUS`()
BEGIN
	#会议状态，0未开始，1进行中，2已结束
	UPDATE meeting set `status` = 0 WHERE time_begin > NOW();
	UPDATE meeting set `status` = 1 WHERE time_begin < NOW() AND time_end > NOW();
	UPDATE meeting set `status` = 2 WHERE time_end < NOW();

END
;;
DELIMITER ;

-- ----------------------------
-- Event structure for update
-- ----------------------------
DROP EVENT IF EXISTS `update`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `update` ON SCHEDULE EVERY 60 SECOND STARTS '2000-01-01 10:10:10' ON COMPLETION NOT PRESERVE ENABLE DO call UPDATE_STATUS()
;;
DELIMITER ;
