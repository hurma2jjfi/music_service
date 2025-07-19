-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 19 2025 г., 22:23
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `potify`
--

-- --------------------------------------------------------

--
-- Структура таблицы `albums`
--

CREATE TABLE `albums` (
  `id` int NOT NULL,
  `artist_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `release_year` year DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `artists`
--

CREATE TABLE `artists` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `bio` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `artists`
--

INSERT INTO `artists` (`id`, `name`, `bio`, `created_at`) VALUES
(1, 'Элджей', 'Российский рэп-исполнитель, известный своими яркими образами и хитами.', '2025-07-19 12:34:19'),
(2, 'Kizaru', 'Олег Нечипоренко-российский рэп исполнитель из Санкт-Петербурга. ', '2025-07-19 19:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `history`
--

CREATE TABLE `history` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `track_id` int NOT NULL,
  `played_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `lyrics`
--

CREATE TABLE `lyrics` (
  `id` int NOT NULL,
  `track_id` int NOT NULL,
  `lyrics` text NOT NULL,
  `synced` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lyrics`
--

INSERT INTO `lyrics` (`id`, `track_id`, `lyrics`, `synced`, `created_at`) VALUES
(1, 1, '[Интро]\r\nSayonara boy\r\nSayonara boy, Sayonara boy\r\nSayonara boy\r\n\r\n[Припев]\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая (Да-да-да)\r\nНо таких как ты — дохуя\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая\r\n(Иди сюда)\r\n\r\n[Куплет 1]\r\nВокруг одни идиоты (Я) и светодиоды (А, а)\r\nЯ пью чёрную воду и алкоголь (Буль-буль)\r\nЯ не знаю кто ты, да и похуй\r\nВедь сегодня ты точно пойдёшь со мной, точно пойдёшь со мной\r\n\r\n[Предприпев]\r\nИ я (Я, я) холодный, как лимонад\r\nНикто (Никто-никто) в этом не виноват\r\nИ я (Я, я) холодный, как лимонад\r\nНикто (Никто-никто) в этом не виноват (Виноват)\r\nSee upcoming pop shows\r\nGet tickets for your favorite artists\r\nYou might also like\r\n4x4\r\nBig Baby Tape\r\nКис Кис Кис (Kis Kis Kis)\r\nМонеточка (Monetochka)\r\nРозовое вино (Rosé Wine)\r\nЭлджей (Eldzhey) & FEDUK\r\n[Припев]\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая (Да-да-да)\r\nНо таких как ты — дохуя\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая (Да-да-да)\r\n\r\n[Куплет 2]\r\nЗабирай свои шмотки, проваливай! (Вали)\r\nМои мозги вдребезги\r\nБыть с тобою — какое-то палево\r\nТы ломаешь всё на куски\r\nЭто всё было неправильно, это всё было неправильно\r\nЗабирай свои шмотки, проваливай!\r\nХочешь мои? Забирай и уёбывай, блядь!\r\nПерестань меня трогать (Сука)\r\nВ стакане я вижу тебя настоящую (Ха-ха):\r\nТакая пиздатая похоть\r\nА остальное — бесящее\r\n\r\n[Предприпев]\r\nПтичка, лети домой (Лети-лети)\r\nВсё будет окей\r\nЯ больше не твой (Твой)\r\nЯ больше ничей (Ничей)\r\nПтичка, лети домой (Лети домой)\r\nВсё будет окей (Окей, е-е)\r\nЯ больше не твой (Не твой)\r\nЯ больше ничей (Ничей-ничей)\r\n[Припев]\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая\r\nНо таких как ты — дохуя\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая\r\n(Таких как ты — дохуя)\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая\r\nНо таких как ты — дохуя\r\nНа баре синие\r\nМы танцуем под минимал\r\nДа-да-да, ты красивая\r\n(Таких как ты — дохуя)\r\n\r\n[Аутро]\r\nSayonara boy (Таких как ты — дохуя)\r\n(Таких как ты — дохуя, таких как ты — дохуя)\r\nSayonara boy, Sayonara boy\r\nSayonara boy!', 0, '2025-07-19 12:34:50'),
(2, 2, '[Интро]\r\nSayonara boy\r\nSayonara boy\r\n\r\n[Припев]\r\nДетка, ты любишь рваные джинсы\r\nО-о-о-о-о-очень рваные джинсы\r\nДетка, ты любишь рваные джинсы\r\nО-о-о-о-о-очень рваные джинсы\r\n\r\n[Куплет 1]\r\nBaby, твои глаза, твои дреды\r\nЛюди вокруг нас — всего лишь скелеты\r\nЯ хочу тебя даже одетой\r\nБыть такими-такими-такими как мы — под запретом\r\nВ твоем лофте, ты-ты-ты-ты в моей кофте\r\nФотки-фотки-фотки-фотки-фотки, если мы на тусовке\r\nЛюбимые кроссовки топчут с тобою вместе\r\nМы жуём мятную жовку под одну из моих песен\r\n\r\n[Припев]\r\nДетка, ты любишь рваные джинсы\r\nО-о-о-о-о-очень рваные джинсы\r\nДетка, ты любишь рваные джинсы\r\nО-о-о-о-о-очень рваные джинсы\r\nО-о-о-о-о, о-о-о!\r\nО-о-о-о-о-очень рваные джинсы\r\nО-о-о-о-о, о-о-о!\r\nSee upcoming pop shows\r\nGet tickets for your favorite artists\r\nYou might also like\r\nПервомай (May Day)\r\nВалентин Стрыкало (Valentin Strikalo)\r\nСайфер 2 (Могу Купить РЗТ) (Cypher)\r\nOG Buda, unki, Toxi$ & SIDODGI DUBOSHIT\r\nThe Code\r\nNemo\r\n[Куплет 2]\r\nДевочка — чупа-чупс, перегазировка чувств\r\nЯ торчу на тебе, ведь я этого хочу\r\nИ ты тоже (Тоже, тоже)\r\nБегут мурашки по коже (Коже, коже)\r\nГлаза-стекляшки\r\nВ стакане газировка с ягодным сиропом\r\nУ нас передозировка, не звоните копам\r\nВ стакане газировка с ягодным сиропом\r\nУ нас передозировка, не звоните копам\r\n\r\n[Припев]\r\nДетка, ты любишь рваные джинсы\r\nО-о-о-о-о-очень рваные джинсы\r\nДетка, ты любишь рваные джинсы\r\nО-о-о-о-о-очень рваные джинсы\r\nО-о-о-о-о, о-о-о!\r\nО-о-о-о-о, очень рваные джинсы\r\nО-о-о-о-о, о-о-о!\r\n\r\n[Аутро]\r\nSayonara boy-boy-boy-boy-boy\r\nSayonara boy', 0, '2025-07-19 12:34:50'),
(3, 3, 'A-ya-ya-yeah\r\nA-ya-ya-ya-yeah\r\n(Sayonara Boy!)\r\n(Sayonara Boy!)\r\nA-ya-ya-yeah…\r\nA-a-ah, a-a-ah…\r\n\r\nBaby, tell me how last week you were leavin\' this\r\nNow you hit me back, sayin’ that you still believe in us\r\nI ain\'t tryna to waste my time\r\nYou had me once, you ain\'t gonna get it twice\r\nBaby, tell me how last week you were leavin’ this\r\nNow you\'re on your knees, actin\' like you always needed it\r\nI ain\'t tryna to waste my time\r\nYou had me once, you ain\'t gonna get it twice, not tonight, baby\r\n\r\nДетка, ты же меня знаешь, я постоянно занят\r\nДумаю о делах даже с закрытыми глазами\r\nТы снова набираешь, никто не отвечает\r\nЯ больше не верю обещаниям\r\nСветофоры, светофоры, а я еду к себе домой\r\nВ розовой i-восьмой довольный и молодой\r\nНе надо плакать в трубку, всё будет хорошо\r\nЯ вернул тебя туда, где нашёл\r\nSee upcoming pop shows\r\nGet tickets for your favorite artists\r\nYou might also like\r\n\r\nBaby, tell me how last week you were leavin\' this\r\nNow you hit me back, sayin\' that you still believe in us\r\nI ain\'t tryna to waste my time\r\nYou had me once, you ain’t gonna get it twice\r\n\r\nBaby, tell me how last week you were leavin’ this\r\nNow you\'re on your knees, actin’ like you always needed it\r\nI ain\'t tryna to waste my time\r\nYou had me once, you ain\'t gonna get it twice, not tonight, baby\r\n\r\nДетка, мы больше не знакомы\r\nПерестань караулить меня возле дома\r\nУдали песни и все фотки с телефона\r\nЗакинься галоперидолом и, наконец, оставь меня в покое\r\nЛечу по Москве, как супергерой\r\nВ тачке без номеров, жую резинку Dirol\r\nЯ больше ничей, я больше не твой\r\nSayonara детка — это Sayonara Boy\r\n\r\nBaby, tell me how last week you were leavin\' this\r\nNow you hit me back, sayin’ that you still believe in us\r\nI ain\'t tryna to waste my time\r\nYou had me once, you ain\'t gonna get it twice\r\n\r\nBaby, tell me how last week you were leavin\' this\r\nNow you\'re on your knees, actin\' like you always needed it\r\nI ain\'t tryna to waste my time\r\nYou had me once, you ain\'t gonna get it twice\r\n\r\nOh, baby\r\n(Sayonara Boy, boy, boy!)\r\n(Sayonara Boy, boy, boy!)', 0, '2025-07-19 13:49:45');

-- --------------------------------------------------------

--
-- Структура таблицы `lyricslines`
--

CREATE TABLE `lyricslines` (
  `id` int NOT NULL,
  `track_id` int NOT NULL,
  `time` float NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lyricslines`
--

INSERT INTO `lyricslines` (`id`, `track_id`, `time`, `text`) VALUES
(4, 3, 2, 'A-ya-ya-yeah'),
(5, 3, 5, 'A-ya-ya-ya-yeah'),
(6, 3, 7, '(Sayonara Boy!)'),
(7, 3, 8, '(Sayonara Boy!)'),
(8, 3, 9, 'A-ya-ya-yeah…'),
(9, 3, 10, 'A-a-ah, a-a-ah…'),
(10, 3, 12, 'Baby, tell me how last week you were leavin\' this'),
(11, 3, 16, 'Now you hit me back, sayin’ that you still believe in us'),
(12, 3, 19, 'I ain\'t tryna to waste my time'),
(13, 3, 22, 'You had me once, you ain\'t gonna get it twice'),
(14, 3, 26, 'Baby, tell me how last week you were leavin’ this'),
(15, 3, 29, 'Now you\'re on your knees, actin\' like you always needed it'),
(16, 3, 31, 'I ain\'t tryna to waste my time'),
(17, 3, 35, 'You had me once, you ain\'t gonna get it twice, not tonight, baby'),
(18, 3, 40, 'Детка, ты же меня знаешь, я постоянно занят'),
(19, 3, 44, 'Думаю о делах даже с закрытыми глазами'),
(20, 3, 47, 'Ты снова набираешь, никто не отвечает'),
(21, 3, 51, 'Я больше не верю обещаниям'),
(22, 3, 53, 'Светофоры, светофоры, а я еду к себе домой'),
(23, 3, 57, 'В розовой i-восьмой довольный и молодой'),
(24, 3, 60, 'Не надо плакать в трубку, всё будет хорошо'),
(25, 3, 64, 'Я вернул тебя туда, где нашёл'),
(26, 3, 67, 'Baby, tell me how last week you were leavin\' this'),
(27, 3, 70, 'Now you hit me back, sayin’ that you still believe in us'),
(28, 3, 73, 'I ain\'t tryna to waste my time'),
(29, 3, 77, 'You had me once, you ain’t gonna get it twice'),
(30, 3, 80, 'Baby, tell me how last week you were leavin’ this'),
(31, 3, 84, 'Now you\'re on your knees, actin’ like you always needed it'),
(32, 3, 87, 'I ain\'t tryna to waste my time'),
(33, 3, 90, 'You had me once, you ain\'t gonna get it twice, not tonight, baby'),
(34, 3, 95, 'Детка, мы больше не знакомы'),
(35, 3, 97, 'Перестань караулить меня возле дома'),
(36, 3, 100, 'Удали песни и все фотки с телефона'),
(37, 3, 103, 'Закинься галоперидолом и, наконец, оставь меня в покое'),
(38, 3, 108, 'Лечу по Москве, как супергерой'),
(39, 3, 111, 'В тачке без номеров, жую резинку Dirol'),
(40, 3, 115, 'Я больше ничей, я больше не твой'),
(41, 3, 118, 'Sayonara детка — это Sayonara Boy'),
(42, 3, 121, 'Baby, tell me how last week you were leavin\' this'),
(43, 3, 125, 'Now you hit me back, sayin’ that you still believe in us'),
(44, 3, 128, 'I ain\'t tryna to waste my time'),
(45, 3, 132, 'You had me once, you ain\'t gonna get it twice'),
(46, 3, 135, 'Baby, tell me how last week you were leavin\' this'),
(47, 3, 138, 'Now you\'re on your knees, actin\' like you always needed it'),
(48, 3, 141, 'I ain\'t tryna to waste my time'),
(49, 3, 145, 'You had me once, you ain\'t gonna get it twice'),
(50, 3, 148, 'Oh, baby'),
(51, 3, 149, '(Sayonara Boy, boy, boy!)'),
(52, 3, 156, '(Sayonara Boy, boy, boy!)');

-- --------------------------------------------------------

--
-- Структура таблицы `playlists`
--

CREATE TABLE `playlists` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `playlisttracks`
--

CREATE TABLE `playlisttracks` (
  `playlist_id` int NOT NULL,
  `track_id` int NOT NULL,
  `position` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `tracks`
--

CREATE TABLE `tracks` (
  `id` int NOT NULL,
  `artist_id` int NOT NULL,
  `album_id` int DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `duration` int NOT NULL,
  `audio_url` varchar(255) DEFAULT NULL,
  `cover_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `tracks`
--

INSERT INTO `tracks` (`id`, `artist_id`, `album_id`, `title`, `duration`, `audio_url`, `cover_url`, `created_at`) VALUES
(1, 2, NULL, 'Simba', 180, 'audio/kizaru_-_SIMBA_79240037.mp3', 'images/WY5jtyNLqPqt6uP3YtcDJISXc9n7U11gNTUbD3UfikT8mlLUywCsTMuAFlOT-iOfZbSUui9cHY1UndtGInJ4Q_RP.jpg', '2025-07-19 12:34:28'),
(2, 1, NULL, 'Рваные джинсы', 180, 'audio/jeldzhjejj_-_Rvanye_dzhinsy_64047832.mp3', 'images/1275x1275bb-60.jpg\r\n', '2025-07-19 12:34:28'),
(3, 1, NULL, 'Sayonara Detka', 164, 'audio/eldzhey_feat_era_istrefi_-_sayonara_detka_65945322.mp3', 'images/Sayonara_детка.jpg', '2025-07-19 13:43:11');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Индексы таблицы `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `track_id` (`track_id`);

--
-- Индексы таблицы `lyrics`
--
ALTER TABLE `lyrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `track_id` (`track_id`);

--
-- Индексы таблицы `lyricslines`
--
ALTER TABLE `lyricslines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `track_id` (`track_id`);

--
-- Индексы таблицы `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `playlisttracks`
--
ALTER TABLE `playlisttracks`
  ADD PRIMARY KEY (`playlist_id`,`track_id`),
  ADD KEY `track_id` (`track_id`);

--
-- Индексы таблицы `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `history`
--
ALTER TABLE `history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `lyrics`
--
ALTER TABLE `lyrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `lyricslines`
--
ALTER TABLE `lyricslines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `Artists` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`track_id`) REFERENCES `Tracks` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `lyrics`
--
ALTER TABLE `lyrics`
  ADD CONSTRAINT `lyrics_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `Tracks` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `lyricslines`
--
ALTER TABLE `lyricslines`
  ADD CONSTRAINT `lyricslines_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `Tracks` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `playlisttracks`
--
ALTER TABLE `playlisttracks`
  ADD CONSTRAINT `playlisttracks_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `Playlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlisttracks_ibfk_2` FOREIGN KEY (`track_id`) REFERENCES `Tracks` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `Artists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tracks_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `Albums` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
