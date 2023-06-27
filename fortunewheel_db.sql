/*
 Navicat Premium Data Transfer

 Source Server         : fortune-wheel
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : 12.12.12.3:3306
 Source Schema         : fortunewheel_db

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 27/06/2023 20:23:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for labels
-- ----------------------------
DROP TABLE IF EXISTS `labels`;
CREATE TABLE `labels` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fillStyle` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `counter` bigint(255) NOT NULL,
  `is_prize` smallint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of labels
-- ----------------------------
BEGIN;
INSERT INTO `labels` VALUES (10, '#f42d92', 'Rice Cooker', '1669821170.jpeg', 2, 1);
INSERT INTO `labels` VALUES (11, '#5dc1d8', 'Ipad Mini', '1669821183.jpeg', 3, 0);
INSERT INTO `labels` VALUES (14, '#5dc1d8', 'Voucher MAP Rp300.000', '1669870658.jpeg', 5, 0);
INSERT INTO `labels` VALUES (15, '#f42d92', 'Ipad Mini ', '1669885289.jpeg', 6, 0);
COMMIT;

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bg_img` varchar(255) DEFAULT NULL,
  `logo_img` varchar(255) DEFAULT NULL,
  `header_img` varchar(255) DEFAULT NULL,
  `body_img` varchar(255) DEFAULT NULL,
  `footer_img` varchar(255) DEFAULT NULL,
  `setting_id` bigint(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_id` (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of settings
-- ----------------------------
BEGIN;
INSERT INTO `settings` VALUES (1, 'background-default.png', 'logo-default.png', 'header-default.png', 'body-default.png', 'footer-default.png', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
