-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: fortunewheel_db
-- ------------------------------------------------------
-- Server version	8.0.32

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

--
-- Table structure for table `labels`
--

DROP TABLE IF EXISTS `labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fillStyle` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `counter` bigint NOT NULL,
  `is_prize` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labels`
--

LOCK TABLES `labels` WRITE;
/*!40000 ALTER TABLE `labels` DISABLE KEYS */;
INSERT INTO `labels` VALUES (21,'#5dc1d8','Ipad','1687967991.webp',1,0),(22,'#f42d92','Smartphone Samsung A04','1687968020.webp',2,0),(23,'#5dc1d8','JBL Clip 4','1687968052.webp',3,0),(24,'#f42d92','JBL GO 3','1687968061.webp',4,0),(25,'#5dc1d8','JBL Tune 110 Earbuds','1687968076.webp',5,0),(26,'#f42d92','Lego Toys','1687968104.webp',6,1),(27,'#5dc1d8','Skullcandy Earbuds','1687968119.webp',7,0),(28,'#f42d92','Oxone Chopper','1687968144.webp',8,0),(29,'#5dc1d8','Oxone Toaster','1687968155.webp',9,0),(30,'#f42d92','Oxone Knife','1687968163.webp',10,0),(31,'#5dc1d8','Casaroyale Teflon','1687968178.webp',11,0),(33,'#f42d92','Xiaomi TV 32\"','1687968199.webp',12,0),(34,'#5dc1d8','Mi Desktop Monitor 27\"','1687968216.webp',13,0),(35,'#f42d92','Mi Smart Air Fryer','1687968236.webp',14,0),(36,'#5dc1d8','Mi Smart Air Purifier','1687968248.webp',15,0),(37,'#f42d92','Mi Smartband','1687968259.webp',16,0),(38,'#5dc1d8','Redmi Buds Essential','1687968277.webp',17,0);
/*!40000 ALTER TABLE `labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bg_img` varchar(255) DEFAULT NULL,
  `logo_img` varchar(255) DEFAULT NULL,
  `header_img` varchar(255) DEFAULT NULL,
  `body_img` varchar(255) DEFAULT NULL,
  `footer_img` varchar(255) DEFAULT NULL,
  `setting_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_id` (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'background-default.png','logo-default.png','header-default.png','body-default.png','footer-default.png',1);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 23:14:58
