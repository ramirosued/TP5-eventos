--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2024-05-31 09:51:22

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16499)
-- Name: event_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_categories (
    id integer NOT NULL,
    display_order numeric NOT NULL,
    name character varying(25) NOT NULL
);


ALTER TABLE public.event_categories OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16498)
-- Name: event_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_categories_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 215
-- Name: event_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_categories_id_seq OWNED BY public.event_categories.id;


--
-- TOC entry 218 (class 1259 OID 16508)
-- Name: event_enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_enrollments (
    id integer NOT NULL,
    id_user integer NOT NULL,
    registration_date_time date NOT NULL,
    attended numeric NOT NULL,
    rating numeric NOT NULL,
    id_event integer NOT NULL,
    description character varying NOT NULL,
    observations character varying NOT NULL
);


ALTER TABLE public.event_enrollments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16507)
-- Name: event_enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_enrollments_id_seq OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 217
-- Name: event_enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_enrollments_id_seq OWNED BY public.event_enrollments.id;


--
-- TOC entry 220 (class 1259 OID 16517)
-- Name: event_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_locations (
    id integer NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    id_creator_user integer NOT NULL,
    id_location integer NOT NULL,
    name character varying NOT NULL,
    full_address character varying NOT NULL,
    max_capacity character varying NOT NULL
);


ALTER TABLE public.event_locations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16516)
-- Name: event_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_locations_id_seq OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 219
-- Name: event_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_locations_id_seq OWNED BY public.event_locations.id;


--
-- TOC entry 222 (class 1259 OID 16526)
-- Name: event_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_tags (
    id integer NOT NULL,
    id_tag integer NOT NULL,
    id_event integer NOT NULL
);


ALTER TABLE public.event_tags OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16525)
-- Name: event_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_tags_id_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 221
-- Name: event_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_tags_id_seq OWNED BY public.event_tags.id;


--
-- TOC entry 224 (class 1259 OID 16533)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    id_event_location integer NOT NULL,
    start_date date NOT NULL,
    duration_in_minutes numeric NOT NULL,
    price numeric NOT NULL,
    enabled_for_enrollment numeric NOT NULL,
    max_assistence numeric NOT NULL,
    id_creator_user integer NOT NULL,
    id_event_category integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16532)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 223
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 227 (class 1259 OID 16543)
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    id_province integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16542)
-- Name: locations_id_province_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_province_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_province_seq OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 226
-- Name: locations_id_province_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_province_seq OWNED BY public.locations.id_province;


--
-- TOC entry 225 (class 1259 OID 16541)
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 225
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- TOC entry 229 (class 1259 OID 16553)
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    display_order numeric NOT NULL,
    name character varying NOT NULL,
    full_name character varying NOT NULL
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16552)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.provinces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provinces_id_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 228
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.provinces_id_seq OWNED BY public.provinces.id;


--
-- TOC entry 231 (class 1259 OID 16562)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16561)
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 230
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- TOC entry 233 (class 1259 OID 16571)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16570)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4675 (class 2604 OID 16502)
-- Name: event_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_categories ALTER COLUMN id SET DEFAULT nextval('public.event_categories_id_seq'::regclass);


--
-- TOC entry 4676 (class 2604 OID 16511)
-- Name: event_enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments ALTER COLUMN id SET DEFAULT nextval('public.event_enrollments_id_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 16520)
-- Name: event_locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations ALTER COLUMN id SET DEFAULT nextval('public.event_locations_id_seq'::regclass);


--
-- TOC entry 4678 (class 2604 OID 16529)
-- Name: event_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags ALTER COLUMN id SET DEFAULT nextval('public.event_tags_id_seq'::regclass);


--
-- TOC entry 4679 (class 2604 OID 16536)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 4680 (class 2604 OID 16546)
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- TOC entry 4681 (class 2604 OID 16547)
-- Name: locations id_province; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id_province SET DEFAULT nextval('public.locations_id_province_seq'::regclass);


--
-- TOC entry 4682 (class 2604 OID 16556)
-- Name: provinces id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces ALTER COLUMN id SET DEFAULT nextval('public.provinces_id_seq'::regclass);


--
-- TOC entry 4683 (class 2604 OID 16565)
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- TOC entry 4684 (class 2604 OID 16574)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4865 (class 0 OID 16499)
-- Dependencies: 216
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_categories VALUES (1, 1, 'Category 1');
INSERT INTO public.event_categories VALUES (2, 2, 'Category 2');
INSERT INTO public.event_categories VALUES (3, 3, 'Category 3');


--
-- TOC entry 4867 (class 0 OID 16508)
-- Dependencies: 218
-- Data for Name: event_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_enrollments VALUES (16, 1, '2024-05-31', 1, 4.5, 4, 'Description 1', 'Observations 1');
INSERT INTO public.event_enrollments VALUES (17, 2, '2024-05-30', 0, 3.2, 5, 'Description 2', 'Observations 2');
INSERT INTO public.event_enrollments VALUES (18, 3, '2024-05-29', 1, 5.0, 6, 'Description 3', 'Observations 3');


--
-- TOC entry 4869 (class 0 OID 16517)
-- Dependencies: 220
-- Data for Name: event_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_locations VALUES (1, 40.7128, -74.0060, 1, 1, 'Event Location 1', 'Address 1', '100');
INSERT INTO public.event_locations VALUES (2, 34.0522, -118.2437, 2, 2, 'Event Location 2', 'Address 2', '150');
INSERT INTO public.event_locations VALUES (3, 51.5074, -0.1278, 3, 3, 'Event Location 3', 'Address 3', '200');


--
-- TOC entry 4871 (class 0 OID 16526)
-- Dependencies: 222
-- Data for Name: event_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_tags VALUES (7, 1, 4);
INSERT INTO public.event_tags VALUES (8, 2, 4);
INSERT INTO public.event_tags VALUES (9, 3, 5);
INSERT INTO public.event_tags VALUES (10, 1, 6);
INSERT INTO public.event_tags VALUES (11, 2, 6);
INSERT INTO public.event_tags VALUES (12, 3, 6);


--
-- TOC entry 4873 (class 0 OID 16533)
-- Dependencies: 224
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events VALUES (4, 1, '2024-06-01', 120, 50.00, 1, 200, 1, 1, 'Event 1', 'Description for Event 1');
INSERT INTO public.events VALUES (5, 2, '2024-06-02', 90, 35.00, 1, 150, 2, 2, 'Event 2', 'Description for Event 2');
INSERT INTO public.events VALUES (6, 3, '2024-06-03', 180, 75.00, 1, 300, 3, 3, 'Event 3', 'Description for Event 3');


--
-- TOC entry 4876 (class 0 OID 16543)
-- Dependencies: 227
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations VALUES (1, 40.7128, -74.0060, 1, 'Location 1');
INSERT INTO public.locations VALUES (2, 34.0522, -118.2437, 2, 'Location 2');
INSERT INTO public.locations VALUES (3, 51.5074, -0.1278, 3, 'Location 3');


--
-- TOC entry 4878 (class 0 OID 16553)
-- Dependencies: 229
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.provinces VALUES (1, 40.7128, -74.0060, 1, 'Province 1', 'Full Name 1');
INSERT INTO public.provinces VALUES (2, 34.0522, -118.2437, 2, 'Province 2', 'Full Name 2');
INSERT INTO public.provinces VALUES (3, 51.5074, -0.1278, 3, 'Province 3', 'Full Name 3');


--
-- TOC entry 4880 (class 0 OID 16562)
-- Dependencies: 231
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tags VALUES (1, 'Tag 1');
INSERT INTO public.tags VALUES (2, 'Tag 2');
INSERT INTO public.tags VALUES (3, 'Tag 3');


--
-- TOC entry 4882 (class 0 OID 16571)
-- Dependencies: 233
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'John', 'Doe', 'johndoe', 'password1');
INSERT INTO public.users VALUES (2, 'Jane', 'Smith', 'janesmith', 'password2');
INSERT INTO public.users VALUES (3, 'Michael', 'Johnson', 'michaelj', 'password3');


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 215
-- Name: event_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_categories_id_seq', 3, true);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 217
-- Name: event_enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_enrollments_id_seq', 18, true);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 219
-- Name: event_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_locations_id_seq', 3, true);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 221
-- Name: event_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_tags_id_seq', 12, true);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 223
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 6, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 226
-- Name: locations_id_province_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_province_seq', 1, false);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 225
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 3, true);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 228
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provinces_id_seq', 3, true);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 230
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 3, true);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 4686 (class 2606 OID 16506)
-- Name: event_categories event_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT event_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4688 (class 2606 OID 16515)
-- Name: event_enrollments event_enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_pkey PRIMARY KEY (id);


--
-- TOC entry 4690 (class 2606 OID 16524)
-- Name: event_locations event_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4692 (class 2606 OID 16531)
-- Name: event_tags event_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4694 (class 2606 OID 16540)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4696 (class 2606 OID 16551)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4698 (class 2606 OID 16560)
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (id);


--
-- TOC entry 4700 (class 2606 OID 16569)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4702 (class 2606 OID 16578)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4703 (class 2606 OID 16584)
-- Name: event_enrollments event_enrollments_id_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_id_event_fkey FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- TOC entry 4704 (class 2606 OID 16629)
-- Name: event_enrollments event_enrollments_id_event_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_id_event_fkey1 FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- TOC entry 4705 (class 2606 OID 16579)
-- Name: event_enrollments event_enrollments_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4706 (class 2606 OID 16624)
-- Name: event_enrollments event_enrollments_id_user_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_id_user_fkey1 FOREIGN KEY (id_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4707 (class 2606 OID 16589)
-- Name: event_locations event_locations_id_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_id_location_fkey FOREIGN KEY (id_location) REFERENCES public.locations(id) NOT VALID;


--
-- TOC entry 4708 (class 2606 OID 16634)
-- Name: event_locations event_locations_id_location_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_id_location_fkey1 FOREIGN KEY (id_location) REFERENCES public.locations(id) NOT VALID;


--
-- TOC entry 4709 (class 2606 OID 16599)
-- Name: event_tags event_tags_id_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_id_event_fkey FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- TOC entry 4710 (class 2606 OID 16644)
-- Name: event_tags event_tags_id_event_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_id_event_fkey1 FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- TOC entry 4711 (class 2606 OID 16594)
-- Name: event_tags event_tags_id_tag_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_id_tag_fkey FOREIGN KEY (id_tag) REFERENCES public.tags(id) NOT VALID;


--
-- TOC entry 4712 (class 2606 OID 16639)
-- Name: event_tags event_tags_id_tag_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_id_tag_fkey1 FOREIGN KEY (id_tag) REFERENCES public.tags(id) NOT VALID;


--
-- TOC entry 4713 (class 2606 OID 16614)
-- Name: events events_id_creator_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_creator_user_fkey FOREIGN KEY (id_creator_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4714 (class 2606 OID 16659)
-- Name: events events_id_creator_user_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_creator_user_fkey1 FOREIGN KEY (id_creator_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4715 (class 2606 OID 16609)
-- Name: events events_id_event_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_event_category_fkey FOREIGN KEY (id_event_category) REFERENCES public.event_categories(id) NOT VALID;


--
-- TOC entry 4716 (class 2606 OID 16654)
-- Name: events events_id_event_category_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_event_category_fkey1 FOREIGN KEY (id_event_category) REFERENCES public.event_categories(id) NOT VALID;


--
-- TOC entry 4717 (class 2606 OID 16604)
-- Name: events events_id_event_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_event_location_fkey FOREIGN KEY (id_event_location) REFERENCES public.event_locations(id) NOT VALID;


--
-- TOC entry 4718 (class 2606 OID 16649)
-- Name: events events_id_event_location_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_event_location_fkey1 FOREIGN KEY (id_event_location) REFERENCES public.event_locations(id) NOT VALID;


--
-- TOC entry 4719 (class 2606 OID 16619)
-- Name: locations locations_id_province_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_id_province_fkey FOREIGN KEY (id_province) REFERENCES public.provinces(id) NOT VALID;


--
-- TOC entry 4720 (class 2606 OID 16664)
-- Name: locations locations_id_province_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_id_province_fkey1 FOREIGN KEY (id_province) REFERENCES public.provinces(id) NOT VALID;


-- Completed on 2024-05-31 09:51:22

--
-- PostgreSQL database dump complete
--

