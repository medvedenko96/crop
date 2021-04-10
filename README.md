# crop

**Todo**

 - notification if delete entity with children ( if delete company with a region or region with a field )
 - first init page
 - edit year

**init husky**
`npx mrm lint-staged`

**sql**

<pre>
CREATE TABLE manager (
    ID SERIAL PRIMARY KEY,
    login VARCHAR(30) NOT NULL,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(32) NOT NULL
);
</pre>

<pre>
CREATE TABLE company (
    ID SERIAL PRIMARY KEY,
    login VARCHAR(30) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(32) NOT NULL
);
</pre>

<pre>
CREATE TABLE region (
    ID SERIAL PRIMARY KEY,
    company_id integer references company(id),
    region_name VARCHAR(255) NOT NULL
);
</pre>

<pre>
CREATE TABLE field (
    ID SERIAL PRIMARY KEY,
    region_id integer references region(id),
    field_name VARCHAR(255) NOT NULL
);
</pre>

<pre>
CREATE TABLE year_field (
    ID SERIAL PRIMARY KEY,
    field_id integer references field(id),
    year_field smallint NOT NULL,
    crop VARCHAR(255) NOT NULL
);
</pre>

