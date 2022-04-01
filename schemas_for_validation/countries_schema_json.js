const countrySchemaJson = {
    "title": "countrySchema",
     "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "the id"
        },
        "country": {
            "type": "string",
            "description": "The country name"
        },
        "region": {
            "type": "string",
            "description": "the region"
        },
        "population": {
            "type": "integer",
            "minimum": 1,
            "description": "the population"
        }

    },
    "required": ["country"]
};

module.exports = countrySchemaJson;
