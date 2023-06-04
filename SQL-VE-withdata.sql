-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: videoeditingprojeck
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `project_data`
--

DROP TABLE IF EXISTS `project_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_data` (
  `email` varchar(255) NOT NULL,
  `video_id` varchar(128) NOT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `video_status` tinyint(1) DEFAULT NULL,
  `video_link` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `email` (`email`),
  CONSTRAINT `project_data_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_data`
--

LOCK TABLES `project_data` WRITE;
/*!40000 ALTER TABLE `project_data` DISABLE KEYS */;
INSERT INTO `project_data` VALUES ('tranvietmar15@gmail.com','123','asdsadasdas',0,NULL),('chaos.wizard.15@gmail.com','JuMLJmVPPf','lost',1,'http://res.cloudinary.com/dincwedfz/video/upload/v1685421391/videos/1685421393123.mp4'),('tranvietmar15@gmail.com','u0E0exJUmA','asdwq',1,'http://res.cloudinary.com/dincwedfz/video/upload/v1685374059/videos/1685374060521.mp4');
/*!40000 ALTER TABLE `project_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `nickname` varchar(512) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiredDate` date DEFAULT NULL,
  `confirmEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('18110238@student.hcmute.edu.vn','Nguyen Nguyen',NULL,NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4MTEwMjM4QHN0dWRlbnQuaGNtdXRlLmVkdS52biIsImlhdCI6MTY4NTUxMDU5MiwiZXhwIjoxNjg1NTUzNzkyfQ.IRwYLAOsNEGa1gbCy4-7JL68gnHTvFdQF22nkqJk3Wg'),('chaos.wizard.15@gmail.com','aseooh','none',NULL,NULL,'done'),('tranvietmar15@gmail.com','Lincon','none',NULL,NULL,'done'),('undead.wizard.2k@gmail.com','Lincon','$2b$10$WCh507fpDw32LYQBkspx9.kX8oa/nqfoLl6kZ7UjBE/E.leNb3mg2',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-04 17:01:44
