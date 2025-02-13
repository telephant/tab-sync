export class AESUtil {
  private static keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  private static utf8Encode(str: string): string {
    return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(parseInt('0x' + p1)));
  }

  private static utf8Decode(str: string): string {
    try {
      return decodeURIComponent(str.split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      return str;
    }
  }

  static encrypt(str: string): string {
    if (!str) return str;
    str = AESUtil.utf8Encode(str);
    const key = AESUtil.utf8Encode(AESUtil.keyStr);
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const keyChar = key.charCodeAt(keyIndex);
      result += String.fromCharCode(charCode ^ keyChar);
      
      keyIndex = (keyIndex + 1) % key.length;
    }
    
    return btoa(result);
  }

  static decrypt(str: string): string {
    if (!str) return str;
    str = atob(str);
    const key = AESUtil.utf8Encode(AESUtil.keyStr);
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const keyChar = key.charCodeAt(keyIndex);
      result += String.fromCharCode(charCode ^ keyChar);
      
      keyIndex = (keyIndex + 1) % key.length;
    }
    
    return AESUtil.utf8Decode(result);
  }
}