build:
	docker build -t tgmu:infoscreen-frontend-v0.2 .
start:
	docker run -d -p 8182:8080 --rm --name tgmu-infoscreen-frontend tgmu:infoscreen-frontend-v0.2
