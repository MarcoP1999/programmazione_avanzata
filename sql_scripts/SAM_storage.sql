-- Database: SAM_storage

-- DROP DATABASE "SAM_storage" WITH (FORCE);

SELECT 'CREATE DATABASE SAM_storage' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'SAM_storage')
\gexec
\c SAM_storage


BEGIN;

CREATE TABLE IF NOT EXISTS public."Datasets"
(
    dataset_id SERIAL PRIMARY KEY,
    fk_user character varying(30) COLLATE pg_catalog."default",
    name character varying(30) COLLATE pg_catalog."default"
);


CREATE TABLE IF NOT EXISTS public."Files"
(
    file_id SERIAL PRIMARY KEY,
    fk_dataaset integer NOT NULL,
    file bytea
);


CREATE TABLE IF NOT EXISTS public."Users"
(
    email character varying(30) PRIMARY KEY COLLATE pg_catalog."default" NOT NULL,
    budget real DEFAULT 20,
    role boolean DEFAULT true
);

INSERT INTO public."Users" (email, budget, role)
    VALUES
    ('user@user.com', 20, true),
    ('admin@admin.com', 200, false);

END;