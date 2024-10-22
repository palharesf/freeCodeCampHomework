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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30),
    star_count integer NOT NULL,
    has_black_holes boolean NOT NULL,
    morphology text NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    planet_id integer,
    name character varying(30),
    moon_planet_diameter_ratio real,
    mean_radius_km integer NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    orbiting_moons integer,
    distance_star_au numeric(18,2),
    colonized boolean,
    star_id integer,
    name character varying(30),
    has_life boolean NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: settlements; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.settlements (
    settlements_id integer NOT NULL,
    name character varying(30),
    mayor text NOT NULL
);


ALTER TABLE public.settlements OWNER TO freecodecamp;

--
-- Name: settlements_settlement_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.settlements_settlement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.settlements_settlement_id_seq OWNER TO freecodecamp;

--
-- Name: settlements_settlement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.settlements_settlement_id_seq OWNED BY public.settlements.settlements_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    orbiting_planets integer,
    galaxy_id integer,
    name character varying(30),
    lifestage text NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: settlements settlements_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.settlements ALTER COLUMN settlements_id SET DEFAULT nextval('public.settlements_settlement_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 100000, true, 'spiral');
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 1000000, true, 'spiral');
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 40000, true, 'spiral');
INSERT INTO public.galaxy VALUES (4, 'Messier 87', 1000000, true, 'elliptical');
INSERT INTO public.galaxy VALUES (5, 'Large Magellanic Cloud', 30000, false, 'irregular');
INSERT INTO public.galaxy VALUES (6, 'Sombrero Galaxy', 100000, true, 'spiral');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 3, 'Luna', 0.2727, 1737);
INSERT INTO public.moon VALUES (2, 4, 'Phobos', 0.0007, 11);
INSERT INTO public.moon VALUES (3, 4, 'Deimos', 0.0004, 6);
INSERT INTO public.moon VALUES (4, 5, 'Io', 0.0266, 1821);
INSERT INTO public.moon VALUES (5, 5, 'Europa', 0.0245, 1560);
INSERT INTO public.moon VALUES (6, 5, 'Ganymede', 0.0413, 2634);
INSERT INTO public.moon VALUES (7, 5, 'Callisto', 0.0378, 2410);
INSERT INTO public.moon VALUES (8, 6, 'Betelgeuse b1', 0.0315, 2100);
INSERT INTO public.moon VALUES (9, 6, 'Betelgeuse b2', 0.021, 1400);
INSERT INTO public.moon VALUES (10, 6, 'Betelgeuse b3', 0.015, 1000);
INSERT INTO public.moon VALUES (11, 7, 'Alpheratz I-A', 0.018, 1200);
INSERT INTO public.moon VALUES (12, 8, 'Alpheratz II-A', 0.0225, 1500);
INSERT INTO public.moon VALUES (13, 8, 'Alpheratz II-B', 0.0135, 900);
INSERT INTO public.moon VALUES (14, 9, 'Mirach Prime I', 0.03, 2000);
INSERT INTO public.moon VALUES (15, 9, 'Mirach Prime II', 0.024, 1600);
INSERT INTO public.moon VALUES (16, 9, 'Mirach Prime III', 0.0195, 1300);
INSERT INTO public.moon VALUES (17, 9, 'Mirach Prime IV', 0.015, 1000);
INSERT INTO public.moon VALUES (18, 9, 'Mirach Prime V', 0.009, 600);
INSERT INTO public.moon VALUES (19, 11, 'Tri Beta Moon', 0.027, 1800);
INSERT INTO public.moon VALUES (20, 17, 'Sombrero-1b Moon', 0.033, 2200);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 0, 0.39, false, 1, 'Mercury', false);
INSERT INTO public.planet VALUES (2, 0, 0.72, false, 1, 'Venus', false);
INSERT INTO public.planet VALUES (3, 1, 1.00, true, 1, 'Earth', true);
INSERT INTO public.planet VALUES (4, 2, 1.52, true, 1, 'Mars', false);
INSERT INTO public.planet VALUES (5, 79, 5.20, false, 1, 'Jupiter', false);
INSERT INTO public.planet VALUES (6, 3, 5.50, false, 2, 'Betelgeuse b', true);
INSERT INTO public.planet VALUES (7, 1, 0.85, false, 3, 'Alpheratz I', false);
INSERT INTO public.planet VALUES (8, 2, 1.73, true, 3, 'Alpheratz II', true);
INSERT INTO public.planet VALUES (9, 5, 3.20, false, 4, 'Mirach Prime', false);
INSERT INTO public.planet VALUES (10, 0, 0.50, false, 5, 'Tri Alpha', false);
INSERT INTO public.planet VALUES (11, 1, 1.20, true, 5, 'Tri Beta', true);
INSERT INTO public.planet VALUES (12, 7, 2.80, false, 7, 'X1-Omega', true);
INSERT INTO public.planet VALUES (13, 2, 1.10, true, 8, 'X2-Alpha', false);
INSERT INTO public.planet VALUES (14, 4, 3.50, false, 8, 'X2-Beta', true);
INSERT INTO public.planet VALUES (15, 12, 4.75, false, 9, 'R136a1-Mega', false);
INSERT INTO public.planet VALUES (16, 1, 0.95, true, 11, 'Sombrero-1a', true);
INSERT INTO public.planet VALUES (17, 3, 2.30, false, 11, 'Sombrero-1b', false);


--
-- Data for Name: settlements; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.settlements VALUES (1, 'New Olympus', 'Dr Aria Stellaris');
INSERT INTO public.settlements VALUES (2, 'Proxima Haven', 'Captain Zephyr Blaze');
INSERT INTO public.settlements VALUES (3, 'Nebula City', 'Councilor Lyra Novastorm');
INSERT INTO public.settlements VALUES (4, 'Andromedas Hope', 'Governor Orion Starweaver');
INSERT INTO public.settlements VALUES (5, 'Celestial Falls', 'Mayor Luna Moonshadow');


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 8, 1, 'Sol', 'stable');
INSERT INTO public.star VALUES (2, 0, 1, 'Betelgeuse', 'red supergiant');
INSERT INTO public.star VALUES (3, 3, 2, 'Alpheratz', 'stable');
INSERT INTO public.star VALUES (4, 5, 2, 'Mirach', 'red giant');
INSERT INTO public.star VALUES (5, 2, 3, 'Beta Trianguli', 'stable');
INSERT INTO public.star VALUES (6, 0, 3, 'Gamma Trianguli', 'white dwarf');
INSERT INTO public.star VALUES (7, 1, 4, 'M87-X1', 'neutron star');
INSERT INTO public.star VALUES (8, 4, 4, 'M87-X2', 'stable');
INSERT INTO public.star VALUES (9, 6, 5, 'R136a1', 'stable');
INSERT INTO public.star VALUES (10, 0, 5, 'S Doradus', 'luminous blue variable');
INSERT INTO public.star VALUES (11, 2, 6, 'Sombrero-1', 'stable');
INSERT INTO public.star VALUES (12, 7, 6, 'Sombrero-2', 'yellow dwarf');


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 17, true);


--
-- Name: settlements_settlement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.settlements_settlement_id_seq', 5, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 12, true);


--
-- Name: galaxy galaxy_id_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_id_unique UNIQUE (galaxy_id);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_id_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_id_unique UNIQUE (moon_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_id_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_id_unique UNIQUE (planet_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: settlements settlements_id_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_id_unique UNIQUE (settlements_id);


--
-- Name: settlements settlements_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.settlements
    ADD CONSTRAINT settlements_pkey PRIMARY KEY (settlements_id);


--
-- Name: star star_id_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_id_unique UNIQUE (star_id);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

