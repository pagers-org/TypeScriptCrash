type PhoneNumber = {
  num: number;
};

type ContactTypes = {
  name: string;
  address: string;
  phones: {
    home: PhoneNumber;
    office?: PhoneNumber;
    studio?: PhoneNumber;
  };
};

function fetchContacts(): Promise<ContactTypes[]> {
  const contacts: ContactTypes[] = [
    {
      name: 'Tony',
      address: 'Malibu',
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
    {
      name: 'Banner',
      address: 'New York',
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: '마동석',
      address: '서울시 강남구',
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
        },
      },
    },
  ];
  return new Promise(resolve => {
    setTimeout(() => resolve(contacts), 2000);
  });
}

class AddressBook {
  contacts: ContactTypes[] = [];

  constructor() {
    this.fetchData();
  }

  fetchData(): void {
    fetchContacts().then(response => {
      this.contacts = response;
    });
  }

  findContactByName(name: string): ContactTypes[] {
    return this.contacts.filter(contact => contact.name === name);
  }

  findContactByAddress(address: string): ContactTypes[] {
    return this.contacts.filter(contact => contact.address === address);
  }

  findContactByPhone(
    phoneNumber: number,
    phoneType: 'home' | 'studio' | 'office',
  ): ContactTypes[] {
    return this.contacts.filter(
      contact => contact.phones[phoneType]?.num === phoneNumber,
    );
  }

  addContact(contact: ContactTypes): void {
    this.contacts.push(contact);
  }

  displayListByName(): string[] {
    return this.contacts.map(contact => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map(contact => contact.address);
  }
}

new AddressBook();

export {};
