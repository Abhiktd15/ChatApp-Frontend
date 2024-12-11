export const samepleChats = [
      {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Doe",
            _id: "1",
            groupChat: false,
            members: ["1", "2"],
      },
      {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Boi",
            _id: "2",
            groupChat: false,
            members: ["1", "2"],
      },
      {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Bhai",
            _id: "3",
            groupChat: true,
            members: ["1", "2"],
      },
];

export const samepleUsers = [
      {
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"1",
            name:"Johnbhai",
      },
      {
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"2",
            name:"John doe",
      },
      {
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"3",
            name:"john doesnt know",
      }
]
export const sampleNotifications = [
      {
            _id:"1",
            sender:{
                  avatar:"https://www.w3schools.com/howto/img_avatar.png",
                  name:"John Doe"
            }
      },
      {
            _id:"2",
            sender:{
                  avatar:"https://www.w3schools.com/howto/img_avatar.png",
                  name:"John Bhai"
            }
      },
      {
            _id:"3",
            sender:{
                  avatar:"https://www.w3schools.com/howto/img_avatar.png",
                  name:"John Dada"
            }
      }
]

export const sampleMessages = [
      {
            attachments :[],
            content:"Hello bro how are you?",
            _id:"adadlkfk",
            sender:{
                  _id:"user._id",
                  name:"Abhishek"
            },
            chat:"chatId",
            createdAt:"2024-02-02T00:00:00.000Z",
      },
      {
            attachments :[
                  // {
                  //       public_id:"d;lafadkjf",
                  //       url:"https://www.w3schools.com/howto/img_avatar.png"
                  // }
            ],
            content:"Hello my name is abhishek bhardwaj Hello my name is abhishek bhardwaj ",
            _id:"sdfsdfsdf",
            sender:{
                  _id:"sdfsdfsdf",
                  name:"Chaman"
            },
            chat:"ChatId",
            createdAt:"2024-12-02T00:00:00.000Z",
      }
]