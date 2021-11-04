# Smart-Shef-Backend
This document contains information about the broker as well as the topics that are used and what they are used for.

# Broker Information
```
Host: 18.141.49.40
Port: 1883
Protocol: TCP
URI: mqtt://18.141.49.40:1883
Auth enabled: True
```

# Topics
The topics below are meant to be consumed by the methods specified (Publish/Subscribe).

## Cooking Process

This topic handles the publishing and subscribing of the stages of the cooking processes.

**Topic** : `smartshef/cooking-process`

**Methods** : `Publish` and `Subscribe`

## Payload
**Sample**

Start cooking a recipe

```json
{
    recipe: "Pancake",
    status: "started"
}
```

Secondary device ready
```json
{
    recipe: "Pancake",
    status: "ready",
    stage: 0
}
```
Cooking process stage 1
```json
{
    recipe: "Pancake",
    status: "ready",
    stage: 1
}
```

Cooking process done/cancelled
```json
{
    recipe: "Pancake",
    status: "done"
}
```

## Images

This topic handles the publishing and subscribing of images during the cooking processes.

**Topic** : `smartshef/image`

**Methods** : `Publish`

## Payload
The image bytearray itself.

## Audio

This topic handles the publishing and subscribing of audio chunks during the cooking processes.

**Topic** : `smartshef/audio`

**Methods** : `Publish`

## Payload
The audio chunk bytearray itself.

## Temperature

This topic handles the publishing and subscribing of temperature data (in °C) during the cooking processes.

**Topic** : `smartshef/temperature`

**Methods** : `Publish`

## Payload

```json
{
    temperature: "38.4",
    timestamp: 1519211809934,
}
```
