# crop

**Todo**

 - add update company password
 - notification if delete entity with children ( if delete company with a region or region with a field )

**init husky**
`npx mrm lint-staged`


**sql**

`CREATE TABLE manager (
    ID SERIAL PRIMARY KEY,
    login VARCHAR(30) NOT NULL,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(32) NOT NULL
);`

`CREATE TABLE company (
    ID SERIAL PRIMARY KEY,
    login VARCHAR(30) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(32) NOT NULL
);`

`CREATE TABLE region (
    ID SERIAL PRIMARY KEY,
    company_id integer references company(id),
    region_name VARCHAR(255) NOT NULL
);`

`CREATE TABLE field (
    ID SERIAL PRIMARY KEY,
    region_id integer references region(id),
    field_name VARCHAR(255) NOT NULL
);
`
