-- users
CREATE SEQUENCE IF NOT EXISTS public.users_seq_id
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.users_seq_id
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_seq_id'::regclass),
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    pwd_hash character varying(100) COLLATE pg_catalog."default",
    "number" character(15) COLLATE pg_catalog."default",
    status integer NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT status_fk FOREIGN KEY (status)
        REFERENCES public.status (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Trigger: users_ai0

-- DROP TRIGGER IF EXISTS users_ai0 ON public.users;

CREATE TRIGGER users_ai0
    BEFORE INSERT
    ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.users_ai0();

-- session

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- apartment
CREATE SEQUENCE IF NOT EXISTS public.apartment_seq_id
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.apartment_seq_id
    OWNER TO postgres;

COMMENT ON SEQUENCE public.apartment_seq_id
    IS 'nextval(''"apartment_seq_id"''::regclass)';

CREATE TABLE IF NOT EXISTS apartment
(
    id bigint NOT NULL DEFAULT nextval('apartment_seq_id'::regclass),
    address character(100) COLLATE pg_catalog."default" NOT NULL,
    city integer NOT NULL,
    owner integer,
    CONSTRAINT apartment_pkey PRIMARY KEY (id),
    CONSTRAINT fk_city FOREIGN KEY (city)
        REFERENCES public.city (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_owner FOREIGN KEY (owner)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.apartment
    OWNER to postgres;

-- city 
CREATE SEQUENCE IF NOT EXISTS public.city_seq_id
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.city_seq_id
    OWNER TO postgres;

COMMENT ON SEQUENCE public.city_seq_id
    IS 'nextval(''"city_seq_id"''::regclass)';

CREATE TABLE IF NOT EXISTS public.city
(
    id integer NOT NULL DEFAULT nextval('city_seq_id'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.city
    OWNER to postgres;

-- review
CREATE SEQUENCE IF NOT EXISTS public.review_seq_id
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.review_seq_id
    OWNER TO postgres;

COMMENT ON SEQUENCE public.review_seq_id
    IS 'nextval(''"review_seq_id"''::regclass)';

CREATE TABLE IF NOT EXISTS public.review
(
    id bigint NOT NULL DEFAULT nextval('review_seq_id'::regclass),
    owner integer,
    apartment integer,
    review integer NOT NULL,
    comment character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT review_pkey PRIMARY KEY (id),
    CONSTRAINT fk_apartment FOREIGN KEY (apartment)
        REFERENCES public.apartment (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_owner FOREIGN KEY (owner)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.review
    OWNER to postgres;

-- status

CREATE TABLE IF NOT EXISTS public.status
(
    id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT status_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.status
    OWNER to postgres;


    -- status infos

    INSERT INTO status(id, name)
                  VALUES(1,'Администратор');
INSERT INTO status(id, name)
                  VALUES(2,'Модератор');
INSERT INTO status(id, name)
                  VALUES(3,'Тестер');
INSERT INTO status(id, name)
                  VALUES(4,'Пользователь');
INSERT INTO status(id, name)
                  VALUES(5,'Гость');
INSERT INTO status(id, name)
                  VALUES(6,'Владелец');