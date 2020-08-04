docker network create --subnet=172.18.0.0/16 red-lab3
docker build -t server/imageserver .
docker run --name serverimage1 -it -p 3010:3010 --network=red-lab3 --ip 172.18.0.3 server/imageserver
docker run --name serverimage2 -it -p 3011:3010 --network=red-lab3 --ip 172.18.0.4 server/imageserver
docker run --name serverimage2 -it -p 3012:3010 --network=red-lab3 --ip 172.18.0.5 server/imageserver