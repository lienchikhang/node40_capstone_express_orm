-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: db_capstone_express_orm
-- Generation Time: 2024-05-01 21:39:15.5200
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Comments` (
  `cmt_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `img_id` int NOT NULL,
  `date` datetime(3) NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `Comments_user_id_fkey` (`user_id`),
  KEY `Comments_img_id_fkey` (`img_id`),
  CONSTRAINT `Comments_img_id_fkey` FOREIGN KEY (`img_id`) REFERENCES `Images` (`img_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `img_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_desc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`img_id`),
  KEY `Images_user_id_fkey` (`user_id`),
  CONSTRAINT `Images_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Saves` (
  `user_id` int NOT NULL,
  `img_id` int NOT NULL,
  `date` datetime(3) NOT NULL,
  PRIMARY KEY (`user_id`,`img_id`),
  KEY `Saves_img_id_fkey` (`img_id`),
  CONSTRAINT `Saves_img_id_fkey` FOREIGN KEY (`img_id`) REFERENCES `Images` (`img_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Saves_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Comments` (`cmt_id`, `user_id`, `img_id`, `date`, `content`) VALUES
(1, 3, 2, '2024-04-15 12:20:00.000', 'nice'),
(2, 2, 2, '2024-04-15 12:20:00.000', 'cool'),
(3, 3, 2, '2024-04-15 12:20:00.000', 'Cooll'),
(4, 2, 2, '2024-04-15 06:13:22.872', 'Qua du luon'),
(5, 1, 7, '2024-04-26 08:04:37.221', 'dasew'),
(6, 1, 7, '2024-04-26 08:06:04.152', 'niceeee'),
(7, 1, 7, '2024-04-26 08:17:27.467', 'ereeeenen'),
(8, 1, 7, '2024-04-26 08:23:22.837', 'nicc'),
(9, 1, 7, '2024-04-26 08:31:35.392', 'côl'),
(10, 1, 7, '2024-04-26 08:34:14.932', 'oh eya'),
(11, 1, 7, '2024-04-26 08:34:32.629', 'oh eyae'),
(12, 1, 7, '2024-04-26 09:03:55.850', 'great pic'),
(13, 1, 7, '2024-04-26 09:04:53.362', 'owep'),
(14, 1, 7, '2024-04-26 09:05:15.424', '3123'),
(15, 1, 7, '2024-04-26 09:06:23.024', 'dasd'),
(16, 1, 7, '2024-04-26 09:07:00.170', 'd'),
(17, 1, 7, '2024-04-26 09:10:58.133', 'oh yea'),
(18, 1, 7, '2024-04-26 09:12:31.502', 'o'),
(19, 1, 7, '2024-04-26 09:14:03.530', 'paodw'),
(20, 1, 7, '2024-04-26 09:15:08.700', 'test'),
(21, 1, 1, '2024-04-28 06:18:06.256', 'nice shoe'),
(22, 1, 1, '2024-04-28 06:19:17.395', 'pretty shoe'),
(23, 1, 1, '2024-04-28 06:20:20.395', 'nice'),
(24, 1, 1, '2024-04-28 06:24:51.854', 'op'),
(25, 1, 1, '2024-04-28 06:27:23.106', 'test'),
(26, 1, 1, '2024-04-28 06:28:37.761', 'opp'),
(27, 1, 1, '2024-04-28 06:30:30.629', 'opppp'),
(28, 1, 1, '2024-04-28 06:32:00.952', 'liaka'),
(29, 1, 6, '2024-04-28 06:32:49.393', 'first comment'),
(30, 1, 57, '2024-05-01 07:09:14.405', 'cool');

INSERT INTO `Images` (`img_id`, `img_name`, `img_url`, `img_desc`, `user_id`) VALUES
(1, 'spider-man', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1713283055/node40_capstone_orm/1713283052933.png.png', 'spider verse', 1),
(2, 'super-car', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1713283055/node40_capstone_orm/1713283052933.png.png', 'picture of car', 1),
(3, 'setup-desktop', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1713282248/node40_capstone_orm/1713282245644.svg.png', 'picture of setting up desktop', 2),
(4, 'pokemon', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1713283055/node40_capstone_orm/1713283052933.png.png', 'picture of pokemon', 2),
(5, 'Eren Yeager', 'https://i.pinimg.com/736x/06/f4/12/06f4126e27ed510e6c110d038222e7b3.jpg', 'Picture of eren in AOT', 2),
(6, 'Test 2', 'https://i.pinimg.com/736x/06/f4/12/06f4126e27ed510e6c110d038222e7b3.jpg', 'Picture of eren in AOT', 2),
(7, 'Test 3', 'https://i.pinimg.com/736x/06/f4/12/06f4126e27ed510e6c110d038222e7b3.jpg', 'Picture of eren in AOT', 2),
(8, 'Setup corner', 'https://i.pinimg.com/564x/03/b1/1e/03b11e37f732d8bbbbf0920b3a6d323a.jpg', 'Picture of setting up', 3),
(9, 'Nike ', 'https://i.pinimg.com/564x/f8/3a/b1/f83ab1d793e8f87b3735b64854e695bf.jpg', 'Picture of Nike', 1),
(10, 'Van Goft', 'https://i.pinimg.com/564x/34/5b/d4/345bd4754527c40eee5e93c27c3a39bf.jpg', 'No idea', 2),
(11, 'AI Art', 'https://i.pinimg.com/564x/fe/10/d9/fe10d92884cfbb01474b01aa3cd64092.jpg', 'I made it with AI generator', 3),
(12, 'Night', 'https://i.pinimg.com/564x/66/d2/94/66d294170470a38fe04e5287445d895e.jpg', 'No idea', 2),
(13, 'Japan', 'https://i.pinimg.com/736x/48/d2/08/48d2088a53accec1ef38d5f736de56d9.jpg', 'Japan', 3),
(14, 'Butter fly', 'https://i.pinimg.com/564x/d6/f6/9d/d6f69d09d2b2b6e1083eb43114192631.jpg', 'no idea', 2),
(51, 'tét call trực tiếp 8', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714546508/node40_capstone_orm/1714546501701.jpg.png', NULL, 1),
(57, 'tét call trực tiếp 19', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714547262/node40_capstone_orm/1714547248147.jpg.png', NULL, 1),
(58, 'nature wallpaper', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714548187/node40_capstone_orm/1714548179052.jpg.png', NULL, 2),
(59, 'Flowers', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714548599/node40_capstone_orm/1714548590656.jpg.png', NULL, 2),
(60, 'clothes', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714549941/node40_capstone_orm/1714549938764.webp.png', NULL, 1),
(61, 'adidas', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714550342/node40_capstone_orm/1714550340205.png.png', NULL, 1),
(62, 'Hello from the other side', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714550439/node40_capstone_orm/1714550437692.jpg.png', NULL, 1),
(71, 'Red Shirt', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714551796/node40_capstone_orm/1714551795426.png.png', 'This is a red shirt', 1),
(72, 'Man city', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714551892/node40_capstone_orm/1714551890384.jpg.png', 'A player of man city', 1),
(73, 'Messi - The GOAT', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714553847/node40_capstone_orm/1714553845384.jpeg.png', 'The GOAT', 9);

INSERT INTO `Saves` (`user_id`, `img_id`, `date`) VALUES
(1, 1, '2024-04-28 06:47:54.944'),
(1, 2, '2024-04-29 12:22:02.356'),
(1, 3, '2024-04-23 08:20:54.140'),
(1, 4, '2024-04-28 06:42:11.648'),
(1, 5, '2024-04-28 06:44:12.307'),
(1, 6, '2024-04-28 06:43:30.766'),
(1, 7, '2024-04-28 06:43:14.667'),
(1, 8, '2024-04-23 08:53:43.621'),
(1, 9, '2024-04-23 08:53:32.249'),
(1, 10, '2024-04-23 06:54:56.718'),
(1, 11, '2024-04-23 06:55:29.507'),
(1, 12, '2024-04-23 06:58:51.621'),
(1, 13, '2024-04-23 06:55:47.068'),
(1, 14, '2024-04-23 06:56:26.054'),
(9, 10, '2024-05-01 08:52:51.456'),
(9, 57, '2024-05-01 08:52:48.660'),
(9, 58, '2024-05-01 08:52:46.669'),
(9, 73, '2024-05-01 08:59:12.218'),
(10, 73, '2024-05-01 09:03:34.709');

INSERT INTO `Users` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`, `refresh_token`) VALUES
(1, 'chikhang11a18@gmail.com', '$2b$07$Ax6viS73uFy5pxeCrPNzm.8.NnYApFFGZ3Qw.t5vQ2d8FlKDPLN4u', 'Amanda Santella', 20, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDU1MzAxMywiZXhwIjoxNzE0NTYzODEzfQ.IrgP60lJP7JN3bfL-E5SBPZh9rJDTYXrYM6_yvcrcKc'),
(2, 'chikhang12a18@gmail.com', '$2b$07$YNOf1viZGWJEGkaiNsYifOCnfkIh00TFrXNUqyNthB1YLS4CM/yVC', 'Alan Walker', 24, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1713344155/node40_capstone_orm/1713344153784.JPG.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDU0ODE0OCwiZXhwIjoxNzE0NTQ5MzQ4fQ.KHwd_PtgxKNPwj_Oq50UCNTLuKg_VbLi1wW4GjywV0k'),
(3, 'chikhang13a18@gmail.com', '$2b$07$8/9aCdt0WYw44XDHD6I3i.23rf8HcdK7LflvjvWSdL5alCHmNuAR6', 'Natalia Portman', 20, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNDU1MjMyMCwiZXhwIjoxNzE0NTUzNTIwfQ.yxjN1vlznFk4T-HcIMW07oIMtHuEklrtsZQjLV_r2fM'),
(4, 'chikhang29a18@gmail.com', '$2b$07$zs.U2Wk9dTRde/HT2yXz5ODr0jSgkxFJhoTjHv3EwFFx34YulNeie', 'Liên Chí Khang', 18, NULL, NULL),
(5, 'chikhang39a18@gmail.com', '$2b$07$.NY27mAADIvIjExqFYRjCOjkTI0yCvGDnAEDxT1WJr72qLfx3s9.W', 'Liên Chí Khang', 21, NULL, NULL),
(6, 'chikhang01a18@gmail.com', '$2b$07$vAG70Y45h.htoevKXeEkAez3fNvVYeBSfWbNM1U9pImBrf8ObXtlO', 'Liên Chí Khang', 21, NULL, NULL),
(7, 'chikhang14a18@gmail.com', '$2b$07$thqNvt70t.Q95aWMA9jXxeI0LhOtCqj45JqjLSZn47fhKqAkALmE.', 'Liên Chí Khang', 18, NULL, NULL),
(8, 'chikhang16a18@gmail.com', '$2b$07$c87oRda1174eAJINzIMKaetfSq1wdtJnPF0K5gNNWpEhTs5fstM2O', 'Anonymous', 18, NULL, NULL),
(9, 'chikhang19a18@gmail.com', '$2b$07$yVnaBtyNbcVp78reHSzUOO5AClph4WTJ00vd/VCdjWpNUU9NWZqey', 'Messi', 18, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1714554009/node40_capstone_orm/1714554006496.jpeg.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTcxNDU3Mzc0NCwiZXhwIjoxNzE0NTg0NTQ0fQ.tFFxSLB-IAKRFmwqI3SAxOU0QILEeKqssVAGvfi9cDE'),
(10, 'kcl@gmail.com', '$2b$07$w7JXeY4imY48cKf7ocSH.uR6xK6vcfMznzbqrEyui108w6rPGRNH.', 'Cristiano Ronaldo', 18, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MTQ1NTQxNjcsImV4cCI6MTcxNDU2NDk2N30.m3Zg5a-J6Pxa21Tmy21sb9rIp74jOiwSrpf0upmuPos'),
(11, 'rmd@gmail.com', '$2b$07$6aMB15QL3MuFtwb1WBQL4eHP.UyCoU3jKE4cY7Xd/6hWBrgjI51y.', 'Real Madrid', 18, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MTQ1NTQ0MzIsImV4cCI6MTcxNDU2NTIzMn0.plu507oYkm7ETQVOHCH3C0DthBz2lOuGR8tLnWPv02s'),
(12, 'chelsea@gmail.com', '$2b$07$m.LBOp48PZSI6XXal043zO3EYtekvqm.f/TQBC41QQyNldl5k.B6C', 'Chelsea Football Club', 18, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MTQ1NTQ0NzgsImV4cCI6MTcxNDU2NTI3OH0.HH39i9pUtRoy1ar7pAjchE-GDkRHucQNLlVzxan46l8');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;