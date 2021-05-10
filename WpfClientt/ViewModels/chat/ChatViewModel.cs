﻿using AsyncAwaitBestPractices.MVVM;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using WpfClientt.model;
using WpfClientt.model.chat;
using WpfClientt.services;

namespace WpfClientt.viewModels {
    public class ChatViewModel : BaseViewModel{

        private object messagesLock = new object();

        private Customer LoggedInCustomer;
        private IChatService chatService;

        public Chat Chat { get; set; }

        public ICommand SendMessageCommand { get; set; }

        public ObservableCollection<Message> Messages { get; set; } = new ObservableCollection<Message>();

        public string ButtonText { get; set; }

        public string MessageBody { get; set; }

        public String TypingMessage { get; set; }

        public ChatViewModel(Chat chat, IChatService chatService, ISet<Message> messages,Customer LoggedInCustomer) {
            SendMessageCommand = new AsyncCommand(SendMessage);
            lock (messagesLock) {
                foreach (Message message in messages) {
                    Messages.Insert(0, message);
                }
            }
            this.LoggedInCustomer = LoggedInCustomer;
            this.Chat = chat;
            ButtonText = !chat.Sold ? "Send Message" : "The item is sold!You can't send messages!";
            this.chatService = chatService;
            this.chatService.AddMessageListener(MessageListener);
        }

        private Task MessageListener(Message message) {
            if (message.ChatId.Equals(Chat.ChatId)) {
                lock (messagesLock) {
                    Messages.Add(message);
                }
            }
            return Task.CompletedTask;
        }

        private async Task SendMessage() {
            if (MessageBody.Trim().Length < 3) {
                return;
            }
            Message message = new Message() { 
                Body = MessageBody, ChatId = Chat.ChatId ,
                Username = LoggedInCustomer.Username,Timestamp = DateTime.UtcNow.ToString("MMMM dd yyyy hh:mm tt")
            };
            await chatService.SendMessage(message);
            lock (messagesLock) {
                Messages.Add(message);
            }
            MessageBody = string.Empty;
            OnPropertyChanged(nameof(MessageBody));
        }

    }
}
