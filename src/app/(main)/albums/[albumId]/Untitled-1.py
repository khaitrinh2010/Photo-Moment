n = int(input())
for _ in range(n):
    line  = input().split(" ")
    word = ""
    for w in line:
        word += w[0]
    print(word)