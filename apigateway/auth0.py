def main():
  import json, urllib, urllib2

  # Configuration Values
  AUDIENCE = "https://saneod.auth0.com/api/v2/"
  DOMAIN = "saneod.auth0.com"
  CLIENT_ID = "jxVozF33Kytvdx6MJEMOTLS2V11t66dt"
  CLIENT_SECRET = "NFmmKd2bNnN4Y1YqiokyAM2t0jvtTEYjolfwF0G3HiQU8Comht2KzbQbRC4y4RBU"
  GRANT_TYPE = "client_credentials" # OAuth 2.0 flow to use

  # Get an access token from Auth0
  base_url = "https://{domain}".format(domain=DOMAIN)
  data = urllib.urlencode([('client_id', CLIENT_ID),
                          ('client_secret', CLIENT_SECRET),
                          ('audience', AUDIENCE),
                          ('grant_type', GRANT_TYPE)])
  req = urllib2.Request(base_url + "/oauth/token", data)
  response = urllib2.urlopen(req)
  oauth = json.loads(response.read())
  access_token = oauth['access_token']
  print access_token

  # # Get all Clients using the token
  # req = urllib2.Request(base_url + "/api/v2/clients")
  # req.add_header('Authorization', 'Bearer ' + access_token)
  # req.add_header('Content-Type', 'application/json')

  # try:
  #   response = urllib2.urlopen(req)
  #   res = json.loads(response.read())
  #   print res
  # except urllib2.HTTPError, e:
  #   print 'HTTPError = ' + str(e.code) + ' ' + str(e.reason)
  # except urllib2.URLError, e:
  #   print 'URLError = ' + str(e.reason)
  # except urllib2.HTTPException, e:
  #   print 'HTTPException'
  # except Exception:
  #   print 'Generic Exception'

# Standard boilerplate to call the main() function.
if __name__ == '__main__':
  main()
