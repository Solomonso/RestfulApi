const countrySchemaXsd = '<?xml version="1.0" encoding="UTF-8" ?>' +
    '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">' +
    '' +
    '    <xs:simpleType name="regionRestricted">' +
    '        <xs:restriction base="xs:string">' +
    '            <xs:enumeration value="SUB-SAHARAN AFRICA"/>' +
    '            <xs:enumeration value="LATIN AMER. &amp; CARIB"/>' +
    '            <xs:enumeration value="ASIA (EX. NEAR EAST)"/>' +
    '            <xs:enumeration value="WESTERN EUROPE"/>' +
    '            <xs:enumeration value="OCEANIA"/>' +
    '            <xs:enumeration value="NORTHERN AMERICA"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '' +
    '    <xs:simpleType name="populationRestricted">' +
    '        <xs:restriction base="xs:integer">' +
    '            <xs:minInclusive value="1"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '' +
    '    <xs:complexType name="country-types">' +
    '        <xs:all>' +
    '            <xs:element name="country" type="xs:string"/>' +
    '            <xs:element name="region" type="regionRestricted"/>' +
    '            <xs:element name="population" type="populationRestricted"/>' +
    '        </xs:all>' +
    '    </xs:complexType>' +
    '' +
    '    <xs:element name="countries" type="country-types"/>' +
    '</xs:schema>';

module.exports = countrySchemaXsd;
