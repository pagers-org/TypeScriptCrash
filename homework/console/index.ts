// api
// TODO: 아래 함수의 반환 타입을 지정해보세요.
export {};

interface ContactsInterface {
  name: string;
  address: string;
  phones: IndexInterface;
}

type PhoneType = 'home' | 'office' | 'studio';

interface IndexInterface {
  [key: string]: { num: number };
}

function fetchContacts(): Promise<ContactsInterface[]> {
  const contacts: ContactsInterface[] = [
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

// main
class AddressBook {
  // TODO: 아래 변수의 타입을 지정해보세요.
  contacts: ContactsInterface[] = [];

  constructor() {
    this.fetchData();
  }

  fetchData(): void {
    fetchContacts().then(response => {
      this.contacts = response;
    });
  }

  /* TODO: 아래 함수들의 파라미터 타입과 반환 타입을 지정해보세요 */
  findContactByName(name: string): ContactsInterface[] {
    return this.contacts.filter(contact => contact.name === name);
  }

  findContactByAddress(address: string): ContactsInterface[] {
    return this.contacts.filter(contact => contact.address === address);
  }

  findContactByPhone(
    phoneNumber: number,
    phoneType: PhoneType,
  ): ContactsInterface[] {
    return this.contacts.filter(
      contact => contact.phones[phoneType].num === phoneNumber,
    );
  }

  addContact(contact: ContactsInterface): void {
    this.contacts.push(contact);
  }

  displayListByName(): string[] {
    return this.contacts.map(contact => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map(contact => contact.address);
  }
  /* ------------------------------------------------ */
}

new AddressBook();
