CREATE DATABASE SAM_storage;
\c SAM_storage
--
-- Database: `SAM_storage`
--
-- --------------------------------------------------------
--
-- Struttura della tabella `Users`
--
CREATE TABLE `Users` (
  `email` varchar(30) NOT NULL,
  `budget` float NOT NULL,
  PRIMARY KEY (`email`)
);
-- --------------------------------------------------------
--
-- Struttura della tabella `Datasets`
--
CREATE TABLE `Datasets` (
  `dataset_id` int NOT NULL,
  `fk_user` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`dataset_id`)
);

-- --------------------------------------------------------
--
-- Struttura della tabella `Files`
--
CREATE TABLE `Files` (
  `file_id` int NOT NULL,
  `fk_dataset` int NOT NULL,
  `file` blob NOT NULL,
  PRIMARY KEY (`file_id`)
);

-- --------------------------------------------------------
--
-- AUTO_INCREMENT per la tabella `Datasets`
--
ALTER TABLE `Datasets`
  MODIFY `dataset_id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `Files`
--
ALTER TABLE `Files`
  MODIFY `file_id` int NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------
--
-- Limiti per la tabella `Datasets`
--
ALTER TABLE `Datasets`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`fk_user`) REFERENCES `Users` (`email`);
--
-- Limiti per la tabella `Files`
--
ALTER TABLE `Files`
  ADD CONSTRAINT `fk_dataset` FOREIGN KEY (`fk_dataset`) REFERENCES `Datasets` (`dataset_id`);
COMMIT;

-- --------------------------------------------------------
--
INSERT INTO users(email, budget) VALUES
('user@user.com', 15),
('marco@proietti.com', 100);