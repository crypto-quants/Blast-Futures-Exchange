def hash(self) -> bytes:
        '''
        Returns the hash of the payload where the params are sorted in 
        alphabetical order.
        '''
        keys = list(self.data.keys())
        keys.sort()
        message = [f'{k}={str(self.data[k]).lower()}' if type(self.data[k]) == bool else f'{k}={self.data[k]}' for k in keys]
        message.append(str(self.timestamp))
        message = ''.join(message)

        h = hashlib.sha256()
        h.update(message.encode())

        return h.digest()

def sign(self, secret: str) -> str:
        '''
        Returns HMAC-SHA256 signature after signing payload hash with
        user secret. 
        '''
        secret_bytes = hex2bytes(secret)

        return '0x' + hmac.new(secret_bytes, self.hash, hashlib.sha256).hexdigest()
