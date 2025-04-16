CREATE TABLE Star (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE StarConnection (
    star_id INTEGER NOT NULL,
    connected_star_id INTEGER NOT NULL,
    PRIMARY KEY (star_id, connected_star_id),
    FOREIGN KEY (star_id) REFERENCES Star(id) ON DELETE CASCADE,
    FOREIGN KEY (connected_star_id) REFERENCES Star(id) ON DELETE CASCADE
);
