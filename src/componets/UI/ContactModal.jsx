import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from './Toasts';
import { REACT_APP_TELEGRAM_BOT_TOKEN, REACT_APP_TELEGRAM_CHAT_ID } from '../../constants/env';
import { useStore } from '../../hooks/useStore';



function ContactModal({ isOpen, onClose }) {

    const store = useStore()


    const [name, setName] = React.useState(store.formData.name ?? '');
    const [phone, setPhone] = React.useState(store.formData.phone ?? '');
    const [text, setText] = React.useState(store.formData.text ?? '');
    const [isSending, setIsSending] = React.useState(false);

    const validatePhone = (phone) => {
        const re = /^\+?[0-9]{1,3}?\s?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
        return re.test(phone);
    }
    const validateName = (name) => {
        const re = /^[a-zA-Zа-яА-Я]+$/;
        return re.test(name?.trim().replaceAll(" ", ''));
    }
    const validateText = (text = "") => {
        return text?.length > 5;
    }



    const sendMessageToTelegram = async () => {
        console.debug('sendMessageToTelegram', REACT_APP_TELEGRAM_BOT_TOKEN, REACT_APP_TELEGRAM_CHAT_ID);
        const message = `<b>ОБРАЩЕНИЕ</b>                <b>Имя:</b><code>${name}</code>                    <b>Телефон:</b><code>${phone}</code>                       <b>Сообщение:</b><code>${text?.trim()}</code>`;
        const url = `https://api.telegram.org/bot${REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${REACT_APP_TELEGRAM_CHAT_ID}&text=${message}&parse_mode=HTML`;
        setIsSending(true);
        try {
            const res = await fetch(url)
            setName('');
            setPhone('');
            res.ok && notifySuccess("Сообщение отправлено!");
            onClose();

        }
        catch (error) {
            console.error('Ошибка:', error);
            notifyError("Ошибка при отправке сообщения!");
        } finally {
            setIsSending(false);
        }
    }


    useEffect(() => {
        store.setFotmData({ name, phone, text })
    }, [name, phone, text])
    if (!isOpen) {
        return null;
    }
    const handleContentClick = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div onClick={(e) => { onClose() }} className='overlay'>
            <div onClick={handleContentClick} className='modal'>

                <div className="contact-conteiner-content" style={{ backgroundColor: "#0D0D0D" }}>
                    <h3>Ваше имя</h3>
                    <input style={{ borderColor: name && !validateName(name) ? "red" : "gray" }} value={name} onChange={(e) => setName(e.target.value?.slice(0, 1)?.toUpperCase() + e.target.value?.slice(1, e.target.value?.length) ?? "")} type="text" placeholder="Введите ваше имя" />
                    <h3>Ваш телефон</h3>

                    <input value={phone} style={{ borderColor: phone && !validatePhone(phone) ? "red" : "gray" }} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Введите ваш номер телефона" />
                    <h3>Текст сообщения</h3>
                    <textarea value={text}

                        style={{ borderColor: phone && !validateText(text) ? "red" : "gray", height: "100px", textAlign: "start", }}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder="Опишите вашу проблемму"
                    />
                    <br />
                    <button disabled={isSending || !validateName(name) || !validatePhone(phone) || !validateText(text)} onClick={sendMessageToTelegram} className="feedback-button button">Отправить</button>
                    <br />

                </div>

            </div>
        </div>
    );
}


export default ContactModal;