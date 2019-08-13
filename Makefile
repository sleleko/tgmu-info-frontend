build:
	docker build -t tgmu:infoscreen-frontend-v0.4 .
start:
	docker run -d -p 8182:8080 --name tgmu-infoscreen-frontend tgmu:infoscreen-frontend-v0.4
