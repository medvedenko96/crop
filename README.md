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
    company_id integer references company(id) ON DELETE CASCADE,
    region_name VARCHAR(255) NOT NULL
);
</pre>

<pre>
CREATE TABLE field (
    ID SERIAL PRIMARY KEY,
    region_id integer references region(id) ON DELETE CASCADE,
    field_name VARCHAR(255) NOT NULL
);
</pre>

<pre>
CREATE TABLE year_field (
    ID SERIAL PRIMARY KEY,
    field_id integer references field(id) ON DELETE CASCADE,
    year_field smallint NOT NULL,
    img_url text,
    description text,
    crop VARCHAR(255) NOT NULL
);
</pre>

<pre>
CREATE TABLE zonal_management (
    ID SERIAL PRIMARY KEY,
    year_id integer references year_field(id) ON DELETE CASCADE,
    type smallint NOT NULL,
    yield_capacity decimal,
    actual_population decimal,
    planting_density decimal,
    hectares decimal
);
</pre>

<pre>
CREATE TABLE norm_bot (
    ID SERIAL PRIMARY KEY,
    year_id integer references year_field(id) ON DELETE CASCADE,
    row_key integer NOT NULL,
    row_number decimal,
    control_norm decimal,
    control_yield decimal,
    control_square decimal,
    experiment_norm decimal,
    experiment_yield decimal,
    experiment_square decimal
);
</pre>
