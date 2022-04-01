const albumSchema = {
    "id": "AlbumListschema",
    "type": "object",
    "properties": {
        "albums": {
            "type": "array",
            "items": {
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "artist": {
                        "type": "string"
                    },
                    "albumName": {
                        "type": "string"
                    },
                    "label": {
                        "type": "string"
                    },
                    "year": {
                        "type": "integer",
                        "minimum": 2010,
                        "maximum": 2019
                    },
                    "country": {
                        "type": "string"
                    },
                    "reviews": {
                        "type": "array",
                        "items": {
                            "properties": {
                                "albumReview": {
                                    "type": "string"
                                },
                                "reviewerName": {
                                    "type": "string"
                                }
                            },
                            "required": ["albumReview", "reviewerName"]
                        }
                    },
                },
                "required": ["artist", "albumName", "label", "year", "reviews", "country"],
            }
        },
    },
    "required": ["albums"]
};
module.exports = albumSchema;
