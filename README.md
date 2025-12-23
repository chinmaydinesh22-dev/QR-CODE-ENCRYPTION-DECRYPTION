🔐 QR Code Encryption & Decryption System
Overview

This project implements a secure mechanism to protect sensitive information by encrypting data before embedding it into a QR code and decrypting it only for authorized users using a secret key.

Problem Statement

Standard QR codes store data in plain text, making them vulnerable to unauthorized access and data misuse when scanned by anyone.

Solution

The system encrypts user data using a symmetric encryption technique and converts the encrypted output into a QR code. During scanning, the same secret key is used to decrypt and retrieve the original data securely.

How It Works

User inputs sensitive data

Data is encrypted using a secret key

Encrypted data is encoded into a QR code

QR code is scanned

Encrypted content is decrypted using the same key

Key Features

Secure data encryption before QR generation

Key-based decryption for authorized access

Prevents plain-text data exposure

Simple and lightweight implementation

Technologies Used

Python

QR Code generation library

Symmetric encryption techniques

Basic file/image handling

Use Cases

Secure information sharing

Authentication systems

Confidential document access

Event or identity verification

Outcome

Demonstrates practical application of cryptography and secure data handling using QR codes, highlighting real-world cybersecurity fundamentals.
