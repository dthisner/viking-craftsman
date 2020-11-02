package mongo

import (
	"context"
	"fmt"
	"log"

	"github.com/dthisner/viking-craftsman/backend/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

// BoozeModel hold the Mongo Client database connection
type BoozeModel struct {
	DB *mongo.Client
}

var database = "booze"

// Get is getting one bottle of booze based on ID
func (m *BoozeModel) Get(id string, office string) (*models.Booze, error) {
	collection := m.DB.Database(database).Collection(office)
	log.Printf("Getting Booze '%s' from '%s'\n", id, office)

	hexID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("Problem converting ID into ObjectIDFromHex: %s", err)
	}
	filter := bson.M{"_id": hexID}

	booze := &models.Booze{}
	err = collection.FindOne(context.Background(), filter).Decode(&booze)
	if err != nil {
		return nil, fmt.Errorf("Problem getting record for id: %s and with error: %v", id, err)
	}

	return booze, nil
}

// GetAll gets all bottles of booze in the DB
func (m *BoozeModel) GetAll(office string) ([]*models.Booze, error) {
	collection := m.DB.Database(database).Collection(office)
	log.Printf("Getting ALL Booze from '%s'\n", office)

	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, fmt.Errorf("Problem getting all booze from DB -> %s", err)
	}
	defer cur.Close(context.Background())

	var results []*models.Booze
	for cur.Next(context.Background()) {
		var result *models.Booze
		e := cur.Decode(&result)
		if e != nil {
			log.Println("Problem Decoding JSON", e)
		}
		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		return nil, fmt.Errorf("Problem packaging all Booze -> %s", err)
	}

	return results, nil
}

// Vote updates the vote with +/- 1 depending on the users vote
func (m *BoozeModel) Vote(id, office string, vote int) error {
	fmt.Println("-- updating Ranking for: ", id)
	collection := m.DB.Database(database).Collection(office)

	booze, err := m.Get(id, office)
	if err != nil {
		return fmt.Errorf("Problem getting id '%s' for changing vote -> %s", id, err)
	}

	if booze.Votes == 0 && vote < 0 {
		return fmt.Errorf("Problem Changing vote value on id: '%s'. Ranking can't be lower then", id)
	}
	booze.Votes = booze.Votes + vote
	bsonID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("Problem converting id '%s' into a bsonID -> %s", id, err)
	}

	filter := bson.M{"_id": bsonID}
	update := bson.M{"$set": bson.M{"votes": booze.Votes}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("Problem Changing vote value on id: '%s', got error: \n %e", id, err)
	}

	return nil
}

// Insert inserts a booze bottle into the DB
func (m *BoozeModel) Insert(booze *models.Booze, office string) error {
	collection := m.DB.Database(database).Collection(office)

	booze.ID = primitive.NewObjectID()
	booze.InStock = true
	_, err := collection.InsertOne(context.Background(), booze)
	if err != nil {
		return fmt.Errorf("Problem inserting Booze into the DB %s", err)
	}

	return nil
}

// Delete inserts a booze bottle into the DB
func (m *BoozeModel) Delete(id, office string) error {
	collection := m.DB.Database(database).Collection(office)

	bsonID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("Problem converting id '%s' into a bsonID -> %s", id, err)
	}

	filter := bson.M{"_id": bsonID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return fmt.Errorf("Problem deleting id '%s' -> %s", id, err)
	}

	log.Println("Deleted Booze id:", id)
	return nil
}

// DeleteAll inserts a booze bottle into the DB
func (m *BoozeModel) DeleteAll(office string) error {
	collection := m.DB.Database(database).Collection(office)

	d, err := collection.DeleteMany(context.Background(), bson.M{}, nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Deleted Document", d.DeletedCount)
	return nil
}
