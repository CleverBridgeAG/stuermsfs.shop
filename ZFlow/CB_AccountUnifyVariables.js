string CB_AccountUnifyVariables(string variable_1, string variable_2)
{
v_value = if(variable_1 == null,variable_2,variable_1);
return v_value;
}