// const express = require('express');
// const { Socket } = require('socket.io');
// const io = require('socket.io')(5000)

// io.on('connection', socket =>{
//     console.log('New User')
//     socket.emit('chat-message','Hello World')
// })

const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

module.exports = io;