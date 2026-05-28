import React, { useState } from 'react';
import useContactsStore from '../../store/contactsStore';

interface ContactsPageProps {
  onGoToChat: (contactId: string) => void;
}

const ContactsPage: React.FC<ContactsPageProps> = ({ onGoToChat }) => {
  const [inputName, setInputName] = useState('');
  const contacts = useContactsStore((s) => s.contacts);
  const addContact = useContactsStore((s) => s.addContact);

  const handleAdd = () => {
    addContact(inputName);
    setInputName('');
  };

  return (
    <div className="dd-page-contacts">
      <div className="dd-page-title">蛋友</div>
      <div>
        <input
          className="dd-contact-input"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button className="dd-btn dd-btn-add" onClick={handleAdd}>添加</button>
      </div>
      <div>
        {contacts.map((c) => (
          <div key={c.id} className="dd-contact-item" onClick={() => onGoToChat(c.id)}>
            <span className="dd-contact-name">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
