const topSongsSchema = {
    "title": "topSongSchema",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "minimum": 0,
            "description": "The id of the song"
        },
        "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40,
            "description": "The title of song"
        },
        "artist": {
            "type": "string",
            "minLength": 1,
            "maxLength": 30,
            "description": "The artist name"
        },
        "genre": {
            "type": "string",
            "minLength": 1,
            "maxLength": 15,
            "description": "The genre of the song"
        },
        "year": {
            "type": "integer",
            "minimum": 2010,
            "maximum": 2019
        },
        "bpm": {
            "type": "integer",
            "minimum": 0,
            "maximum": 209
        },
        "energy": {
            "type": "integer",
            "minimum": 0,
            "maximum": 98
        },
        "danceability": {
            "type": "integer",
            "minimum": 0,
            "maximum": 97
        },
        "liveliness": {
            "type": "integer",
            "minimum": 0,
            "maximum": 74
        }

    },
    "required": ["title", "artist", "genre", "year"]
};

module.exports = topSongsSchema;
