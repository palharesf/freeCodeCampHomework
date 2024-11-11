--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE guesses;
--
-- Name: guesses; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE guesses WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE guesses OWNER TO freecodecamp;

\connect guesses

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(22) NOT NULL,
    games_played integer DEFAULT 0 NOT NULL,
    best_game integer
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (85, 'user_1731340874282', 227, 227);
INSERT INTO public.users VALUES (102, 'user_1731341132351', 2, 275);
INSERT INTO public.users VALUES (88, 'user_1731340970149', 507, 219);
INSERT INTO public.users VALUES (101, 'user_1731341132352', 5, 143);
INSERT INTO public.users VALUES (87, 'user_1731340970150', 1635, 151);
INSERT INTO public.users VALUES (86, 'mark', 23, 4);
INSERT INTO public.users VALUES (90, 'user_1731341067659', 2, 295);
INSERT INTO public.users VALUES (89, 'user_1731341067660', 5, 212);
INSERT INTO public.users VALUES (92, 'user_1731341094774', 2, 244);
INSERT INTO public.users VALUES (91, 'user_1731341094775', 5, 106);
INSERT INTO public.users VALUES (94, 'user_1731341098336', 2, 259);
INSERT INTO public.users VALUES (93, 'user_1731341098337', 5, 214);
INSERT INTO public.users VALUES (96, 'user_1731341101871', 2, 236);
INSERT INTO public.users VALUES (95, 'user_1731341101872', 5, 179);
INSERT INTO public.users VALUES (98, 'user_1731341112618', 2, 147);
INSERT INTO public.users VALUES (97, 'user_1731341112619', 5, 142);
INSERT INTO public.users VALUES (100, 'user_1731341116210', 2, 201);
INSERT INTO public.users VALUES (99, 'user_1731341116211', 5, 192);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 102, true);


--
-- PostgreSQL database dump complete
--

