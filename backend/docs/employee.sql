CREATE TABLE employees (
	id BIGINT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	phone varchar(16) NULL,
	email varchar(150) NULL,
	company varchar(100) NOT NULL,
	sector varchar(100) NOT NULL,
	`role` varchar(100) NULL,
	created DATETIME NOT NULL,
	updated DATETIME NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
CREATE INDEX employees_sector_IDX USING BTREE ON employees (sector);
CREATE INDEX employees_role_IDX USING BTREE ON employees (`role`);
