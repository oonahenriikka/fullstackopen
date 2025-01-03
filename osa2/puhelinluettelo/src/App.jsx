import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import PersonService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('success'); // Define notificationType state

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        console.log('Received data:', initialPersons);
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (!Array.isArray(persons)) {
      console.error('persons is not an array:', persons);
      return;
    }
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        PersonService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response));
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`Updated ${newName}`);
            setNotificationType('success');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setNotificationMessage(`Information of ${newName} has already been removed from server`);
            } else {
              setNotificationMessage(`Error updating ${newName}`);
            }
            setNotificationType('error');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const newId = persons.length > 0 ? Math.max(...persons.map(person => parseInt(person.id, 10) || 0)) + 1 : 1;
      const newPerson = { id: newId.toString(), name: newName, number: newNumber };

      PersonService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
          setNotificationMessage(`Added ${newName}`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage(`Error adding ${newName}`);
          setNotificationType('error');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMessage(`Deleted ${person.name}`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage(`Error deleting ${person.name}`);
          setNotificationType('error');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const personExists = (name) => {
    return persons.some(person => person.name === name);
  };

  const filteredPersons = Array.isArray(persons) ? persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
