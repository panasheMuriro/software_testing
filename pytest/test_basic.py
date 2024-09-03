import pytest

def test_addition():
    assert 1 + 1 == 2
    print("Addition test passed successfully!", "green")

test_addition()


# Learning using fixtures
@pytest.fixture
def user():
    return {"username": "test_user", "password": "securepassword"}

def test_user_login(user):
    assert user["username"] == "test_user"

def test_user_password(user):
    assert user["password"] == "securepassword"


@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (0, 0, 0),
    (10, 3, 13)
])
def test_addition(a, b, expected):
    assert a + b == expected