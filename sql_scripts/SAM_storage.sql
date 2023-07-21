-- Database: SAM_storage

-- DROP DATABASE "SAM_storage" WITH (FORCE);

SELECT 'CREATE DATABASE SAM_storage' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'SAM_storage')
\gexec
\c SAM_storage


BEGIN;

CREATE TABLE IF NOT EXISTS public."Datasets"
(
    dataset_id integer NOT NULL,
    fk_user character varying(30) COLLATE pg_catalog."default",
    name character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT "Datasets_pkey" PRIMARY KEY (dataset_id)
);


CREATE TABLE IF NOT EXISTS public."Files"
(
    file_id integer NOT NULL,
    fk_dataaset integer NOT NULL,
    file bytea,
    CONSTRAINT "Files_pkey" PRIMARY KEY (file_id)
);


CREATE TABLE IF NOT EXISTS public."Users"
(
    email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    budget real DEFAULT 20,
    role boolean DEFAULT true,
    CONSTRAINT "Users_pkey" PRIMARY KEY (email)
);

INSERT INTO public."Users" (email, budget, role)
    VALUES
    ('user@user.com', 20, true),
    ('admin@admin.com', 200, false);

END;