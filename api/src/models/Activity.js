const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficult: {
            type: DataTypes.ENUM({ //Solo acepta los siguientes valores
                values: ['1', '2', '3', '4', '5']
            })
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        season: {
            type: DataTypes.ENUM({ //Solo acepta los siguientes valores
                values: ['Summer', 'Fall', 'Spring', 'Winter']
            })
        },
    }, {timestamps: false});
}

/*
[ ] Actividad Turística con las siguientes propiedades:
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
*/