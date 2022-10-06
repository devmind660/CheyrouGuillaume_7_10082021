-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 06 oct. 2022 à 12:24
-- Version du serveur :  5.7.32
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Gif_comments`
--

CREATE TABLE `Gif_comments` (
  `id` tinyint(11) UNSIGNED NOT NULL,
  `author_id` tinyint(11) UNSIGNED DEFAULT NULL,
  `gif_id` tinyint(11) UNSIGNED NOT NULL,
  `gif_comment` varchar(255) NOT NULL,
  `publication_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Gif_comments`
--

INSERT INTO `Gif_comments` (`id`, `author_id`, `gif_id`, `gif_comment`, `publication_date`) VALUES
(1, 1, 4, 'J\"arrive !', '2021-12-28 11:35:47'),
(2, NULL, 4, 'fghrgthfdhf', '2022-05-11 19:32:23');

-- --------------------------------------------------------

--
-- Structure de la table `Gif_posts`
--

CREATE TABLE `Gif_posts` (
  `id` tinyint(11) UNSIGNED NOT NULL,
  `author_id` tinyint(11) UNSIGNED DEFAULT NULL,
  `gif_url` mediumtext NOT NULL,
  `gif_title` varchar(255) DEFAULT NULL,
  `gif_desc` varchar(255) NOT NULL,
  `publication_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Gif_posts`
--

INSERT INTO `Gif_posts` (`id`, `author_id`, `gif_url`, `gif_title`, `gif_desc`, `publication_date`) VALUES
(3, 1, 'https://steamuserimages-a.akamaihd.net/ugc/807677704948622840/21A0551D4B134FABAD5793A5D949D10FC98272DC/', 'Enchanté', 'Leonardo Di Caprio tendant son verre', '2021-12-28 11:25:23'),
(4, 2, 'https://th.bing.com/th/id/R.4bad1da6fa8810df723f9529564873e5?rik=1VFHtFglRItTRA&pid=ImgRaw&r=0', 'Il faut faire vite !', 'BB8 roulant à toute vitesse', '2021-12-28 11:28:46'),
(5, 2, 'https://th.bing.com/th/id/R.99d2fab12ea8d6d76ebedfedbbcea345?rik=jE6nNGjBfYLmfg&pid=ImgRaw&r=0', 'J\'arrive', 'Voiture roulant dangereusement entre les voiess', '2022-05-11 21:33:12');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` tinyint(11) UNSIGNED NOT NULL,
  `username` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin_rights` tinyint(1) NOT NULL DEFAULT '0',
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `admin_rights`, `creation_date`) VALUES
(1, 'Leonardo', 'diamondsky660@gmail.com', '$2b$10$KbjJdWRP5LKsoAZgG8kXPes0n0l7K4UIrNbA.QGyNhFG0P11muYoG', 1, '2021-12-28 10:45:27'),
(2, 'Guillaume', 'gui.cheyrou@gmail.com', '$2b$10$tkOjnc/eV8Ocpx9oZmdmn.zf.B0k0n9mz4WCy4Z45dOZJXfxyAVhG', 0, '2021-12-28 11:27:01');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Gif_comments`
--
ALTER TABLE `Gif_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`gif_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Index pour la table `Gif_posts`
--
ALTER TABLE `Gif_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Gif_comments`
--
ALTER TABLE `Gif_comments`
  MODIFY `id` tinyint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Gif_posts`
--
ALTER TABLE `Gif_posts`
  MODIFY `id` tinyint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` tinyint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Gif_comments`
--
ALTER TABLE `Gif_comments`
  ADD CONSTRAINT `gif_comments_ibfk_1` FOREIGN KEY (`gif_id`) REFERENCES `Gif_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gif_comments_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `Gif_posts`
--
ALTER TABLE `Gif_posts`
  ADD CONSTRAINT `gif_posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
