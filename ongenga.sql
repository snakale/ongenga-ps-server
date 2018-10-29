-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2018 at 12:37 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ongenga`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_373ead146f110f04dad6084815` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `password`, `created_at`, `updated_at`, `userId`) VALUES
(1, '$2b$05$42ZBRIMKig0srca6y6u4M.iZESytyc30zA06/o6Goqtzb55Z3/Nke', '2018-10-10 17:15:26.921827', '2018-10-10 17:15:26.921827', 2),
(2, '$2b$05$42ZBRIMKig0srca6y6u4M.iZESytyc30zA06/o6Goqtzb55Z3/Nke', '2018-10-10 17:30:41.458805', '2018-10-10 17:30:41.458805', 3),
(3, '$2b$05$2al/NH0f.y.HuOCR35jrneJsvDLQj3Pl94X0wmqak/tPHxe12BEda', '2018-10-10 17:31:02.020041', '2018-10-10 17:31:02.020041', 4),
(4, '$2b$05$R31uVz1XCMkhY80a4nvWHOtSYymeMSg9kDM0T7D00S0iCV5nNms2O', '2018-10-10 18:12:17.608637', '2018-10-10 18:12:17.608637', 5);

-- --------------------------------------------------------

--
-- Table structure for table `mark`
--

CREATE TABLE IF NOT EXISTS `mark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ca_mark` int(11) NOT NULL,
  `exam_mark` int(11) NOT NULL,
  `final_mark` int(11) NOT NULL,
  `term` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `grade` int(11) NOT NULL,
  `schoolClass` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_d8c1a74fec247de6dbc950dd8f` (`year`),
  KEY `FK_65796a73ff78b0df716f4d808f2` (`studentId`),
  KEY `FK_a2bb960ee519e60e7c91110087b` (`subjectId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE IF NOT EXISTS `parent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `contactDetails` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `IDX_68a85c1eee233f3caa7345b3e8` (`surname`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`id`, `name`, `address`, `contactDetails`, `surname`, `created_at`, `updated_at`) VALUES
(1, 'Vemba', '', 'ds a,vf dsa\nds fbdsf \n0814057950', 'McDrodger', '2018-10-21 14:47:34.705104', '2018-10-21 14:47:34.705104'),
(2, 'Vemba', '', 'ds a,vf dsa\nds fbdsf \n0814057950', 'McDrodger', '2018-10-21 14:47:34.839111', '2018-10-21 14:47:34.839111'),
(3, 'Fenny', '', 'da fds f\ndsf dsf \n0814057950', 'McDrodger', '2018-10-21 14:48:46.293198', '2018-10-21 14:48:46.293198'),
(4, 'Fenny', '', 'da fds f\ndsf dsf \n0814057950', 'McDrodger', '2018-10-21 14:48:46.321200', '2018-10-21 14:48:46.321200'),
(5, 'Jane', '', 'dsa fdsaf\ndasfdsaf\n0814057950', 'Gregory', '2018-10-21 14:50:38.359608', '2018-10-21 14:50:38.359608'),
(6, 'Jane', '', 'dsa fdsaf\ndasfdsaf\n0814057950', 'Gregory', '2018-10-21 14:50:38.398610', '2018-10-21 14:50:38.398610'),
(7, 'Jane', '', 'dsa fdsaf\ndasfdsaf\n0814057950', 'Gregory', '2018-10-21 14:51:13.616625', '2018-10-21 14:51:13.616625'),
(8, 'Jane', '', 'dsa fdsaf\ndasfdsaf\n0814057950', 'Gregory', '2018-10-21 14:51:13.650627', '2018-10-21 14:51:13.650627'),
(9, 'Jane', '', 'dsa fdsaf\ndasfdsaf\n0814057950', 'Gregory', '2018-10-21 15:05:20.888086', '2018-10-21 15:05:20.888086'),
(10, 'Jane', '', 'dsa fdsaf\ndasfdsaf\n0814057950', 'Gregory', '2018-10-21 15:05:20.926088', '2018-10-21 15:05:20.926088');

-- --------------------------------------------------------

--
-- Table structure for table `school_subject`
--

CREATE TABLE IF NOT EXISTS `school_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `grade` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_1a6032105d322f1b412ef15ae0` (`grade`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `school_subject`
--

INSERT INTO `school_subject` (`id`, `name`, `created_at`, `updated_at`, `grade`) VALUES
(1, 'Mathematics', '2018-10-27 18:23:55.639960', '2018-10-27 18:23:55.639960', '0'),
(2, 'English', '2018-10-27 18:24:05.835543', '2018-10-27 18:24:05.835543', '0'),
(3, 'Oshindonga', '2018-10-27 18:24:12.803942', '2018-10-27 18:24:12.803942', '0'),
(4, 'Bible Studies', '2018-10-27 18:24:31.031985', '2018-10-27 18:24:31.031985', '0');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('GjtAVhn8J6F6UJpxp0_FTUT8xkW73PG0', 1540899388, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"userId":2,"role":1}'),
('nRKqxbahEZjZuyNWJae5brGz7BgNXiMT', 1540835886, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"userId":2,"role":1}');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `names` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `grade` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `studentClass` varchar(255) NOT NULL,
  `parent1Id` int(11) NOT NULL,
  `parent2Id` int(11) NOT NULL,
  `registerTeacherId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_449657d916269da088d375411d8` (`registerTeacherId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `names`, `surname`, `grade`, `gender`, `studentClass`, `parent1Id`, `parent2Id`, `registerTeacherId`) VALUES
(1, 'Dave', 'McDrodger', 0, 'female', '0', 1, 2, 3),
(2, 'Jeffy', 'McDrodger', 1, 'female', '1', 3, 4, 4),
(3, 'Max', 'Gregory', 0, 'male', '0', 9, 10, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `names` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `teacherGrade` int(11) NOT NULL,
  `teacherClass` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `names`, `surname`, `email`, `role`, `teacherGrade`, `teacherClass`) VALUES
(2, 'Sam', 'Nakale', 'samnakale@yahoo.co.uk', 1, 1, 1),
(3, 'Kalin', 'Mbemba', 'kmbemba@gmail.com', 0, 0, 0),
(4, 'Jean', 'Fernando', 'jfernando@gmail.com', 0, 2, 2),
(5, 'Juddy', 'Jean', 'jjean@gmail.com', 0, 0, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `FK_373ead146f110f04dad60848154` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `mark`
--
ALTER TABLE `mark`
  ADD CONSTRAINT `FK_65796a73ff78b0df716f4d808f2` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `FK_a2bb960ee519e60e7c91110087b` FOREIGN KEY (`subjectId`) REFERENCES `school_subject` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FK_449657d916269da088d375411d8` FOREIGN KEY (`registerTeacherId`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
