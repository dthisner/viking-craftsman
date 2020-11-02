package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Request is for when people are requesting new Booze to take into the office
type Request struct {
	Why       string `json:"why" validate:"required,min=5,max=225"`
	FirstName string `json:"firstName" validate:"required,min=2,max=15"`
	LastName  string `json:"lastName" validate:"required,min=2,max=15"`
}

//Booze holds basic structure for beer, wine, hard liquior etc
type Booze struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	Name           string             `json:"name" validate:"required,min=2,max=25"`
	BaseType       string             `json:"base_type" validate:"required,min=3,max=25"`
	Types          []string           `json:"types,omitempty"`
	Volume         int                `json:"volume" validate:"required"`
	InStock        bool               `json:"in_stock"`
	Country        string             `json:"country,omitempty"`
	Votes          int                `json:"votes"`
	OfficeLocation string             `json:"office_location" validate:"required,min=5,max=25"`
	Request        *Request           `json:"request,omitempty"`
}

// Vote is for adding or removing votes for the booze
type Vote struct {
	Value int `json:"value"`
}

// ValidationErrors is to send back a nice JSON format error list to
type ValidationErrors struct {
	Field string `json:"field"`
	Error string `json:"error"`
}
