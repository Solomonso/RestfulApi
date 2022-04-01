const albumSchemaXsd = '<?xml version="1.0" encoding="UTF-8" ?>' +
    '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">' +
    '    <xs:complexType name="review-type">' +
    '        <xs:all>' +
    '            <xs:element name="reviewerName" type="xs:string"/>' +
    '            <xs:element name="albumReview" type="xs:string"/>' +
    '        </xs:all>' +
    '    </xs:complexType>' +
    '    <xs:complexType name="reviews-type">' +
    '        <xs:sequence minOccurs="1" maxOccurs="unbounded">' +
    '            <xs:element name="review" type="review-type"/>' +
    '        </xs:sequence>' +
    '    </xs:complexType>' +
    '        <xs:simpleType name="yearRestricted">' +
    '            <xs:restriction base="xs:int">' +
    '                <xs:minInclusive value="1996"/>' +
    '                <xs:maxInclusive value="2019"/>' +
    '            </xs:restriction>' +
    '        </xs:simpleType>' +
    '    <xs:complexType name="album-type">' +
    '        <xs:all>' +
    '            <xs:element name="id" type="xs:int"/>' +
    '            <xs:element name="artist" type="xs:string"/>' +
    '            <xs:element name="albumName" type="xs:string"/>' +
    '            <xs:element name="label" type="xs:string"/>' +
    '            <xs:element name="year" type="yearRestricted"/>' +
    '            <xs:element name="reviews" type="reviews-type"/>' +
    '            <xs:element name="country" type="xs:string"/>' +
    '        </xs:all>' +
    '    </xs:complexType>' +
    '    <xs:complexType name="album-types">' +
    '        <xs:sequence  minOccurs="1" maxOccurs="unbounded">' +
    '            <xs:element name="album" type="album-type"/>' +
    '        </xs:sequence>' +
    '    </xs:complexType>' +
    '    <xs:element name="albums" type="album-types"/>' +
    '</xs:schema>'

module.exports = albumSchemaXsd;
